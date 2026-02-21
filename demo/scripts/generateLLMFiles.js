#!/usr/bin/env node

// This script generates LLM files from the HTML pages and markdown content in the project.
// This is fully automated and happens after the build process.
// Mark single HTML elements to be excluded by giving them the class "no-llm"

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

console.log("🚀 Starting LLM files generation...");

/**
 * Get site hostname from astro.config.mjs
 */
function getSiteHostname() {
  try {
    const astroConfigPath = path.join(rootDir, "astro.config.mjs");
    const astroConfigContent = fs.readFileSync(astroConfigPath, "utf-8");
    const siteMatch = astroConfigContent.match(/site:\s*['"]([^'"]+)['"]/);
    if (siteMatch) {
      const url = new URL(siteMatch[1]);
      return url.hostname;
    }
  } catch (error) {
    console.warn("Warning: Could not read astro.config.mjs:", error.message);
  }
  return "";
}

/**
 * Get meta title and description from root page
 */
function getRootPageMeta() {
  try {
    const rootPagePath = path.join(distDir, "index.html");
    if (!fs.existsSync(rootPagePath)) {
      return { title: "", description: "" };
    }
    return getRootPageMetaFromFile(rootPagePath);
  } catch (error) {
    console.warn("Warning: Could not read root page meta:", error.message);
    return { title: "", description: "" };
  }
}

/**
 * Extract meta title and description from a specific HTML file
 */
function getRootPageMetaFromFile(filePath) {
  const html = fs.readFileSync(filePath, "utf-8");
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  // Get meta title
  let title = "";
  const titleTag = doc.querySelector("title");
  if (titleTag) {
    title = titleTag.textContent.trim().split("|")[0].trim();
  }
  // Get meta description
  let description = "";
  const metaDesc = doc.querySelector('meta[name="description"]');
  if (metaDesc) {
    description = metaDesc.getAttribute("content") || "";
  }
  return { title, description };
}

/**
 * Extract text content from HTML with optional title extraction
 */
function extractTextFromHTML(html, extractTitle = false) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const codeBlockPlaceholders = new Map();
  // Extract title before removing h1 elements if requested
  let title = "";
  if (extractTitle) {
    const h1 = doc.querySelector("h1");
    const h2 = doc.querySelector("h2");
    const titleTag = doc.querySelector("title");
    if (h1 && h1.textContent.trim()) {
      title = h1.textContent.trim();
    } else if (h2 && h2.textContent.trim()) {
      title = h2.textContent.trim();
    } else if (titleTag) {
      title = titleTag.textContent.trim().split("|")[0].trim();
    }
  }
  // Preserve code blocks as placeholders before stripping elements
  const codeBlockSelector =
    "pre, .expressive-code, .ec-code, .ec-codeblock, .code-block";
  const codeBlocks = doc.querySelectorAll(codeBlockSelector);
  let codeBlockIndex = 0;
  codeBlocks.forEach((el) => {
    const parentBlock = el.parentElement?.closest(codeBlockSelector);
    if (parentBlock && parentBlock !== el) {
      return;
    }
    const clone = el.cloneNode(true);
    clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
    const codeLines = clone.querySelectorAll(".ec-line");
    let codeText;
    if (codeLines.length > 0) {
      codeText = Array.from(codeLines)
        .map((line) => line.textContent)
        .join("\n")
        .replace(/\n+$/g, "");
    } else {
      const codeElement = clone.querySelector("code");
      codeText = (codeElement || clone).textContent.replace(/\n+$/g, "");
    }
    if (!codeText.trim()) {
      return;
    }
    const placeholder = `__LLM_CODE_BLOCK_${codeBlockIndex}__`;
    codeBlockPlaceholders.set(placeholder, codeText);
    const textNode = doc.createTextNode(placeholder);
    el.replaceWith(textNode);
    codeBlockIndex += 1;
  });

  // Remove script and style elements
  const scripts = doc.querySelectorAll("script, style, noscript");
  scripts.forEach((el) => el.remove());
  // Remove navigation, footer, header, and other UI elements including hidden elements
  const uiElements = doc.querySelectorAll(
    'nav, footer, header, .language-select, .social-share, .pagination, #toc-overlay, #header, #language-switcher, .breadcrumb, .breadcrumbs, [role="navigation"], .navigation, .nav, .no-llm, .hidden',
  );
  uiElements.forEach((el) => el.remove());
  // Remove decorative background text elements (the ones that would have had .no-llm class)
  // These are typically low opacity decorative elements that got purged during CSS optimization
  const decorativeElements = doc.querySelectorAll(
    '.opacity-5, [class*="opacity-5"]',
  );
  decorativeElements.forEach((el) => el.remove());
  // Remove h1 elements (already used as title)
  const h1Elements = doc.querySelectorAll("h1");
  h1Elements.forEach((el) => el.remove());
  // Also remove h2 elements that duplicate the title
  const h2Elements = doc.querySelectorAll("h2");
  h2Elements.forEach((el) => {
    const h2Text = el.textContent.trim();
    // Remove if it matches the title
    if (title && h2Text === title) {
      el.remove();
    }
  });

  /**
   * Check if two elements have a parent-child relationship
   */
  function isParentChild(elem1, elem2) {
    return elem1.contains(elem2) || elem2.contains(elem1);
  }

  // Extract content while preserving paragraph structure
  let content = "";
  // Get the main content container first, fallback to body
  let contentContainer =
    doc.body.querySelector("main") ||
    doc.body.querySelector('[role="main"]') ||
    doc.body.querySelector("#content") ||
    doc.body.querySelector(".content") ||
    doc.body;
  // Get all text-containing elements in document order
  const walker = doc.createTreeWalker(
    contentContainer,
    4, // NodeFilter.SHOW_TEXT
    {
      acceptNode: function (node) {
        // Skip text nodes that are inside script, style, or other excluded elements
        let parent = node.parentElement;
        while (parent) {
          const tagName = parent.tagName.toLowerCase();
          if (
            ["script", "style", "noscript", "nav", "footer", "header"].includes(
              tagName,
            )
          ) {
            return 3; // NodeFilter.FILTER_REJECT
          }
          if (
            parent.classList.contains("language-select") ||
            parent.classList.contains("social-share") ||
            parent.classList.contains("pagination") ||
            parent.classList.contains("opacity-5") ||
            parent.classList.contains("hidden")
          ) {
            return 3; // NodeFilter.FILTER_REJECT
          }
          parent = parent.parentElement;
        }
        return 1; // NodeFilter.FILTER_ACCEPT
      },
    },
  );
  const processedTexts = new Set();
  let currentParagraph = "";
  let lastElement = null;
  let textNode;
  while ((textNode = walker.nextNode())) {
    const text = textNode.textContent.trim();
    if (!text || processedTexts.has(text)) continue;
    const element = textNode.parentElement;
    const tagName = element.tagName.toLowerCase();
    // Check if we're in a new block-level element
    if (lastElement && lastElement !== element) {
      const lastTagName = lastElement.tagName.toLowerCase();
      const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName);
      const wasHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(
        lastTagName,
      );

      // Only create line breaks for significant structural changes:
      // 1. When entering or leaving a heading
      // 2. When moving between different block containers (but not between inline and block within the same logical content)
      const isBlockLevel = [
        "div",
        "p",
        "li",
        "blockquote",
        "section",
        "article",
        "header",
        "footer",
        "main",
        "aside",
      ].includes(tagName);
      const wasBlockLevel = [
        "div",
        "p",
        "li",
        "blockquote",
        "section",
        "article",
        "header",
        "footer",
        "main",
        "aside",
      ].includes(lastTagName);

      // Create line break if:
      // - We encounter a heading
      // - We're transitioning between different block-level containers that are not parent-child related
      const shouldBreak =
        isHeading ||
        wasHeading ||
        (isBlockLevel && wasBlockLevel && !isParentChild(lastElement, element));

      if (shouldBreak && currentParagraph.trim()) {
        content += currentParagraph.trim() + "\n";
        currentParagraph = "";
      }
    }
    // Add text to current paragraph
    if (
      currentParagraph &&
      !currentParagraph.endsWith(" ") &&
      !text.startsWith(" ")
    ) {
      currentParagraph += " ";
    }
    currentParagraph += text;
    processedTexts.add(text);
    lastElement = element;
  }
  // Add the last paragraph
  if (currentParagraph.trim()) {
    content += currentParagraph.trim() + "\n";
  }
  // Fallback to simpler extraction if nothing found
  if (!content.trim()) {
    const textElements = contentContainer.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, li, div",
    );
    for (const el of textElements) {
      const text = el.textContent.trim();
      if (text && text.length > 0 && !processedTexts.has(text)) {
        content += text + "\n";
        processedTexts.add(text);
      }
    }
  }
  // Clean up repeated patterns and common navigation text
  let cleanedContent = content;
  // Remove repeated title patterns (e.g., "Legal NoticeLegal Notice")
  if (extractTitle && title) {
    const titlePattern = new RegExp(
      `${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "gi",
    );
    cleanedContent = cleanedContent.replace(titlePattern, "");
    // Also remove single occurrences of the title at the beginning
    const singleTitlePattern = new RegExp(
      `^\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`,
      "im",
    );
    cleanedContent = cleanedContent.replace(singleTitlePattern, "");
  }
  // Clean up excessive whitespace while preserving paragraph breaks
  cleanedContent = cleanedContent
    .replace(/\n{2,}/g, "\n") // Replace 2+ consecutive newlines with 1
    .replace(/[ \t]+/g, " ") // Replace multiple spaces/tabs with single space
    .trim();

  if (codeBlockPlaceholders.size > 0) {
    for (const [placeholder, codeText] of codeBlockPlaceholders.entries()) {
      const fencedCode = `\n\n\`\`\`\n${codeText}\n\`\`\`\n\n`;
      cleanedContent = cleanedContent.replace(placeholder, fencedCode);
    }
    cleanedContent = cleanedContent.trim();
  }
  return extractTitle ? { title, content: cleanedContent } : cleanedContent;
}

/**
 * Check if HTML has noindex meta tag
 */
function hasNoIndexTag(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  // Check for meta robots noindex
  const robotsMeta = doc.querySelectorAll('meta[name="robots"]');
  for (const meta of robotsMeta) {
    const content = meta.getAttribute("content");
    if (content && content.toLowerCase().includes("noindex")) {
      return true;
    }
  }
  return false;
}

/**
 * Get all HTML files from dist
 */
function getDistFiles() {
  const files = [];

  function scanDir(dir, basePath = "") {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const relativePath = path.join(basePath, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // Skip [lang] directories (dynamic routes)
        if (entry.startsWith("[") && entry.endsWith("]")) {
          continue;
        }
        scanDir(fullPath, relativePath);
      } else if (entry === "index.html") {
        // Add the directory path (without index.html)
        const urlPath = basePath === "" ? "/" : `/${basePath}/`;

        // Check for noindex before adding to files
        const html = fs.readFileSync(fullPath, "utf-8");
        if (!hasNoIndexTag(html)) {
          files.push({
            filePath: fullPath,
            urlPath: urlPath,
          });
        } else {
          console.log(`   🚫 Skipping ${urlPath} (noindex)`);
        }
      } else if (entry.endsWith(".html")) {
        // Handle direct HTML files (but exclude 404.html)
        if (entry === "404.html") {
          continue;
        }
        const fileName = entry.replace(".html", "");

        if (basePath === "") {
          // Root level HTML files
          let urlPath = `/${fileName}/`;
          // Check for noindex before adding to files
          const html = fs.readFileSync(fullPath, "utf-8");
          if (!hasNoIndexTag(html)) {
            files.push({
              filePath: fullPath,
              urlPath: urlPath,
            });
          } else {
            console.log(`   🚫 Skipping ${urlPath} (noindex)`);
          }
        } else {
          const urlPath = `/${basePath}/${fileName}/`;
          // Check for noindex before adding to files
          const html = fs.readFileSync(fullPath, "utf-8");
          if (!hasNoIndexTag(html)) {
            files.push({
              filePath: fullPath,
              urlPath: urlPath,
            });
          } else {
            console.log(`   🚫 Skipping ${urlPath} (noindex)`);
          }
        }
      }
    }
  }
  if (fs.existsSync(distDir)) {
    scanDir(distDir);
  }
  return files;
}

/**
 * Generate the LLM files
 */
async function generateLLMFiles() {
  try {
    console.log("📄 Scanning HTML pages...");
    const distFiles = getDistFiles();
    console.log(`Found ${distFiles.length} pages`);
    const hostname = getSiteHostname();
    const rootMeta = getRootPageMeta();

    let briefContent = `# ${rootMeta.title} | ${hostname} | EN\n`;
    if (rootMeta.description) {
      briefContent += `\n${rootMeta.description}\n`;
    }
    briefContent += `\nGenerated on: ${new Date().toISOString()}\n\n`;

    // Add pages (same as full version, no separate "Pages" section)
    for (const file of distFiles) {
      try {
        const html = fs.readFileSync(file.filePath, "utf-8");
        const { title, content } = extractTextFromHTML(html, true);

        if (title && content.length > 50) {
          briefContent += `## ${title}\n`;
          briefContent += `${content}\n\n`;
          briefContent += `---\n\n`;
        }
      } catch (error) {
        console.warn(
          `Warning: Could not process ${file.filePath}:`,
          error.message,
        );
      }
    }

    let fullContent = `# ${rootMeta.title} | ${hostname} | EN\n`;
    if (rootMeta.description) {
      fullContent += `\n${rootMeta.description}\n`;
    }
    fullContent += `\nGenerated on: ${new Date().toISOString()}\n\n`;

    // Add full page content (same as brief version)
    for (const file of distFiles) {
      try {
        const html = fs.readFileSync(file.filePath, "utf-8");
        const { title, content } = extractTextFromHTML(html, true);

        if (title && content.length > 50) {
          fullContent += `## ${title}\n`;
          fullContent += `${content}\n\n`;
          fullContent += `---\n\n`;
        }
      } catch (error) {
        console.warn(
          `Warning: Could not process ${file.filePath}:`,
          error.message,
        );
      }
    }

    // Write files
    const llmsPath = path.join(distDir, "llms.txt");
    const llmsFullPath = path.join(distDir, "llms-full.txt");
    fs.writeFileSync(llmsPath, briefContent, "utf-8");
    fs.writeFileSync(llmsFullPath, fullContent, "utf-8");
    console.log(`   ✅ Generated ${path.basename(llmsPath)}`);
    console.log(`   ✅ Generated ${path.basename(llmsFullPath)}`);
    console.log(
      `   📊 Brief file: ${(briefContent.length / 1024).toFixed(1)}KB`,
    );
    console.log(`   📊 Full file: ${(fullContent.length / 1024).toFixed(1)}KB`);
    console.log("\n🎉 Generated LLM files!");
  } catch (error) {
    console.error("❌ Error generating LLM files:", error);
    process.exit(1);
  }
}

// Run the script
generateLLMFiles();
