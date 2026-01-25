/**
 * Ghost TOC - Table of Contents Generator for Ghost Blog
 *
 * Automatically generates a table of contents from article headings.
 * Supports collapsible functionality and custom styling.
 *
 * While designed specifically for Ghost, this script works on any webpage
 * with an <article> tag containing heading elements (H2-H6).
 *
 * @author Volodymyr Lavrynovych
 * @license MIT
 */

/**
 * Table of Contents generator class
 */
class TOC {
  /**
   * Initializes the TOC and sets up DOM loaded event listener
   */
  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.onLoad());
  }

  /**
   * Main initialization method called when DOM is ready
   * Reads all configuration attributes from <toc> element and builds the TOC
   *
   * Supported attributes:
   * - title: TOC heading text
   * - collapsible: Enable collapse/expand functionality (true/false)
   * - show-text: Text for expand button (default: "Show")
   * - hide-text: Text for collapse button (default: "Hide")
   * - default-state: Initial state for collapsible TOC (collapsed/expanded, default: "expanded")
   * - levels: Comma-separated heading levels to include (default: "2,3,4,5,6")
   * - class: Custom CSS classes to add to container
   * - remember-state: Persist state in localStorage (true/false)
   * - list-style: List marker style (bullets/numbers/none, default: "bullets")
   * - exclude: Comma-separated heading IDs to exclude from TOC
   * - border-color: Border color for collapsible TOC (default: "gainsboro")
   * - bg-color: Background color for collapsible TOC (default: "aliceblue")
   */
  onLoad() {
    try {
      this.article = document.querySelector('article');
      if (!this.article) {
        console.warn('Ghost TOC: No <article> tag found on page');
        return;
      }
      const toc = this.article.querySelector('toc');
      if (!toc) return;
      this.collapsible = toc.getAttribute("collapsible") === 'true';
      this.showText = toc.getAttribute("show-text") || 'Show';
      this.hideText = toc.getAttribute("hide-text") || 'Hide';
      this.defaultState = toc.getAttribute("default-state") || 'expanded';
      const levelsAttr = toc.getAttribute("levels");
      this.allowedLevels = levelsAttr ? levelsAttr.split(',').map(l => parseInt(l.trim())) : [2, 3, 4, 5, 6];
      this.customClass = toc.getAttribute("class") || '';
      this.rememberState = toc.getAttribute("remember-state") === 'true';
      this.listStyle = toc.getAttribute("list-style") || 'bullets';
      const excludeAttr = toc.getAttribute("exclude");
      this.excludeIds = excludeAttr ? excludeAttr.split(',').map(id => id.trim()) : [];
      toc.appendChild(this.createStyles(toc));
      toc.appendChild(this.createHtml(toc));
    } catch (error) {
      console.error('Ghost TOC: Failed to initialize', error);
    }
  }

  /**
   * Creates and returns a <style> element with CSS for the TOC
   *
   * @param {HTMLElement} toc - The <toc> element containing configuration attributes
   * @returns {HTMLStyleElement} Style element with generated CSS
   */
  createStyles(toc) {
    const style = this.el('style');
    style.textContent = `
      toc .toc-container { width: 100%; }
      toc .toc-title { text-align: center; margin-bottom: 15px }
      toc .toc-show-hide-button {
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        color: inherit;
        text-decoration: underline;
      }
      toc .toc-show-hide-button:hover {
        text-decoration: none;
      }
    `;
    if(this.collapsible) {
      const borderColor = toc.getAttribute("border-color");
      const bgColor = toc.getAttribute("bg-color");
      const collapsibleStyles = `
        toc .toc-container {
          border: 1px solid ${borderColor || 'gainsboro'};
          padding: 20px;
          background: ${bgColor || 'aliceblue'};
        }
      `;
      style.textContent = `${style.textContent} ${collapsibleStyles}`;
    }
    let listStyleType;
    if (this.listStyle === 'numbers') {
      listStyleType = 'decimal';
    } else if (this.listStyle === 'none') {
      listStyleType = 'none';
    } else {
      listStyleType = 'disc';
    }
    const listStyles = `
      toc .table-of-contents ul {
        list-style-type: ${listStyleType};
      }
    `;
    style.textContent = `${style.textContent} ${listStyles}`;
    return style;
  }

  /**
   * Creates the main HTML structure for the TOC
   *
   * @param {HTMLElement} toc - The <toc> element containing configuration attributes
   * @returns {HTMLDivElement} Container div with complete TOC structure
   */
  createHtml(toc) {
    const container = this.el("div", 'toc-container');
    if (this.customClass) {
      container.classList.add(...this.customClass.split(' ').filter(c => c.trim()));
    }
    if(this.collapsible) {
      container.appendChild(this.createShowHideButton());
    }
    const title = this.createTitle(toc.getAttribute("title"));
    title && container.appendChild(title);
    container.appendChild(this.createNavigation());
    return container;
  }

  /**
   * Creates the title element for the TOC
   *
   * @param {string} title - The title text
   * @returns {HTMLHeadingElement|undefined} H2 element with title text, or undefined if no title
   */
  createTitle(title) {
    if (!title) return
    const titleElement = this.el('H2', 'toc-title');
    titleElement.textContent = title;
    return titleElement;
  }

  /**
   * Creates the show/hide toggle button for collapsible TOC
   * Sets up button with proper ARIA attributes for accessibility
   *
   * @returns {HTMLSpanElement} Container span with positioned toggle button
   */
  createShowHideButton() {
    const buttonElement = this.el('button', 'toc-show-hide-button');
    buttonElement.setAttribute('type', 'button');
    buttonElement.setAttribute('aria-expanded', 'false');
    buttonElement.setAttribute('aria-controls', 'toc-navigation');
    buttonElement.setAttribute('aria-label', 'Toggle table of contents');
    this.buttonElement = buttonElement;
    buttonElement.textContent = this.showText;
    buttonElement.style.position = 'absolute';
    buttonElement.style.right = '0';
    buttonElement.style.cursor = 'pointer';
    buttonElement.style['white-space'] = 'nowrap';
    const buttonContainerElement = this.el('span', 'toc-button-container');
    buttonContainerElement.style.float = 'right';
    buttonContainerElement.style.width = '0';
    buttonContainerElement.style.height = '0';
    buttonContainerElement.style.position = 'relative';
    buttonContainerElement.appendChild(buttonElement);
    return buttonContainerElement;
  }

  /**
   * Toggles the visibility of the table of contents
   * Updates button text, ARIA attributes, and optionally saves state to localStorage
   *
   * @param {HTMLElement} tableOfContents - The navigation element to toggle
   */
  toggleTable(tableOfContents) {
    if (tableOfContents.style.display === 'none' || !tableOfContents.style.display) {
      tableOfContents.style.display = 'block';
      this.buttonElement.textContent = this.hideText;
      this.buttonElement.setAttribute('aria-expanded', 'true');
      if (this.rememberState) {
        localStorage.setItem('ghost-toc-state', 'expanded');
      }
    } else {
      tableOfContents.style.display = 'none';
      this.buttonElement.textContent = this.showText;
      this.buttonElement.setAttribute('aria-expanded', 'false');
      if (this.rememberState) {
        localStorage.setItem('ghost-toc-state', 'collapsed');
      }
    }
  }

  /**
   * Creates the navigation element containing the TOC list
   * Sets up initial collapsed/expanded state and attaches event listeners
   *
   * @returns {HTMLElement} Navigation element with complete TOC structure
   */
  createNavigation() {
    const nav = this.el('nav', 'table-of-contents');
    nav.setAttribute('id', 'toc-navigation');
    nav.setAttribute('role', 'navigation');
    nav.appendChild(this.buildList(this.prepareStructure()));
    if(this.collapsible) {
      let initialState = this.defaultState;
      if (this.rememberState) {
        const savedState = localStorage.getItem('ghost-toc-state');
        if (savedState) {
          initialState = savedState;
        }
      }
      if (initialState === 'collapsed') {
        nav.style.display = 'none';
        this.buttonElement.textContent = this.showText;
        this.buttonElement.setAttribute('aria-expanded', 'false');
      } else {
        nav.style.display = 'block';
        this.buttonElement.textContent = this.hideText;
        this.buttonElement.setAttribute('aria-expanded', 'true');
      }
      this.buttonElement.addEventListener('click', () => this.toggleTable(nav));
    }
    return nav;
  }

  /**
   * Creates a single list item with a link for a heading
   *
   * @param {HTMLElement} el - The heading element to create a link for
   * @returns {HTMLLIElement} List item containing anchor link to the heading
   */
  createItem(el) {
    const item = this.el('li'),
          link = this.el('a');
    link.setAttribute('href', `#${el.id}`);
    link.textContent = el.textContent;
    item.appendChild(link);
    return item;
  }

  /**
   * Recursively builds a nested list structure from a tree of heading nodes
   *
   * @param {Array<{el: HTMLElement, list: Array}>} tree - Tree structure of heading nodes
   * @returns {HTMLUListElement} Unordered list element with nested structure
   */
  buildList(tree) {
    const list = this.el('ul');
    tree.forEach(node => {
      const li = this.createItem(node.el);
      if (node.list.length) li.appendChild(this.buildList(node.list))
      list.appendChild(li)
    })
    return list;
  }

  /**
   * Scans article headings and builds a hierarchical tree structure
   * Filters headings based on configuration (levels, exclude list, Ghost author name)
   * Uses a stack-based algorithm to maintain proper nesting hierarchy
   *
   * @returns {Array<{el: HTMLElement, list: Array}>} Tree structure representing heading hierarchy
   */
  prepareStructure() {
    const tree = [];
    const stack = [];
    Array.from(this.article.querySelectorAll('h2,h3,h4,h5,h6'))
      .filter(header => {
        if (header.className === 'gh-article-author-name') return false;
        if (!header.id) {
          console.warn('Ghost TOC: Heading missing id attribute:', header.textContent);
          return false;
        }
        const level = parseInt(header.tagName.substring(1));
        if (!this.allowedLevels.includes(level)) return false;
        if (this.excludeIds.includes(header.id)) return false;
        return true;
      })
      .forEach(header => {
        const level = parseInt(header.tagName.substring(1));
        const node = {el: header, list: []};
        if (stack.length === 0) {
          stack.push({level, node});
          tree.push(node);
        } else {
          let last = stack[stack.length - 1];
          while (last && level <= last.level) {
            stack.pop();
            last = stack[stack.length - 1];
          }
          if (last) {
            last.node.list.push(node);
          } else {
            tree.push(node);
          }
          stack.push({level, node});
        }
      });
    return tree;
  }

  /**
   * Utility method to create a DOM element with optional class attribute
   *
   * @param {string} tagName - HTML tag name for the element
   * @param {string} [clazz] - Optional CSS class name to add to the element
   * @returns {HTMLElement} Created DOM element
   */
  el(tagName, clazz) {
    const el = document.createElement(tagName);
    if (clazz) el.setAttribute('class', clazz);
    return el;
  }
}

new TOC();