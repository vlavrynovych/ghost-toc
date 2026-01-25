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

// Constants
const STORAGE_KEY = 'ghost-toc-state';

const DEFAULTS = {
  showText: 'Show',
  hideText: 'Hide',
  defaultState: 'expanded',
  levels: [2, 3, 4, 5, 6],
  listStyle: 'bullets',
  borderColor: 'gainsboro',
  bgColor: 'aliceblue'
};

const LIST_STYLE_MAP = {
  numbers: 'decimal',
  none: 'none',
  bullets: 'disc'
};

const STATE = {
  expanded: 'expanded',
  collapsed: 'collapsed'
};

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

      if (!toc) {
        return;
      }

      this.readAttributes(toc);

      toc.appendChild(this.createStyles(toc));
      toc.appendChild(this.createHtml(toc));
    } catch (error) {
      console.error('Ghost TOC: Failed to initialize', error);
    }
  }

  /**
   * Reads and stores all configuration attributes from the <toc> element
   *
   * @param {HTMLElement} toc - The <toc> element containing configuration attributes
   */
  readAttributes(toc) {
    this.collapsible = toc.getAttribute("collapsible") === 'true';
    this.showText = toc.getAttribute("show-text") || DEFAULTS.showText;
    this.hideText = toc.getAttribute("hide-text") || DEFAULTS.hideText;
    this.defaultState = toc.getAttribute("default-state") || DEFAULTS.defaultState;
    this.customClass = toc.getAttribute("class") || '';
    this.rememberState = toc.getAttribute("remember-state") === 'true';
    this.listStyle = toc.getAttribute("list-style") || DEFAULTS.listStyle;

    const levelsAttr = toc.getAttribute("levels");
    this.allowedLevels = levelsAttr
      ? levelsAttr.split(',').map(l => parseInt(l.trim()))
      : DEFAULTS.levels;

    const excludeAttr = toc.getAttribute("exclude");
    this.excludeIds = excludeAttr
      ? excludeAttr.split(',').map(id => id.trim())
      : [];
  }

  /**
   * Creates and returns a <style> element with CSS for the TOC
   *
   * @param {HTMLElement} toc - The <toc> element containing configuration attributes
   * @returns {HTMLStyleElement} Style element with generated CSS
   */
  createStyles(toc) {
    const style = this.el('style');

    const baseStyles = this.getBaseStyles();
    const collapsibleStyles = this.getCollapsibleStyles(toc);
    const listStyles = this.getListStyles();

    style.textContent = `${baseStyles}${collapsibleStyles}${listStyles}`;

    return style;
  }

  /**
   * Gets base CSS styles for the TOC
   *
   * @returns {string} CSS string with base styles
   */
  getBaseStyles() {
    return `
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
  }

  /**
   * Gets collapsible-specific CSS styles
   *
   * @param {HTMLElement} toc - The <toc> element containing style attributes
   * @returns {string} CSS string with collapsible styles, or empty string
   */
  getCollapsibleStyles(toc) {
    if (!this.collapsible) {
      return '';
    }

    const borderColor = toc.getAttribute("border-color") || DEFAULTS.borderColor;
    const bgColor = toc.getAttribute("bg-color") || DEFAULTS.bgColor;

    return `
      toc .toc-container {
        border: 1px solid ${borderColor};
        padding: 20px;
        background: ${bgColor};
      }
    `;
  }

  /**
   * Gets list-style CSS based on configuration
   *
   * @returns {string} CSS string with list styles
   */
  getListStyles() {
    const listStyleType = this.getListStyleType();

    return `
      toc .table-of-contents ul {
        list-style-type: ${listStyleType};
      }
    `;
  }

  /**
   * Maps list-style attribute to CSS list-style-type value
   *
   * @returns {string} CSS list-style-type value
   */
  getListStyleType() {
    return LIST_STYLE_MAP[this.listStyle] || LIST_STYLE_MAP.bullets;
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

    if (this.collapsible) {
      container.appendChild(this.createShowHideButton());
    }

    const title = this.createTitle(toc.getAttribute("title"));

    if (title) {
      container.appendChild(title);
    }

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
    if (!title) {
      return;
    }

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
    buttonElement.textContent = this.showText;

    this.applyButtonStyles(buttonElement);

    this.buttonElement = buttonElement;

    const buttonContainerElement = this.el('span', 'toc-button-container');
    buttonContainerElement.style.float = 'right';
    buttonContainerElement.style.width = '0';
    buttonContainerElement.style.height = '0';
    buttonContainerElement.style.position = 'relative';
    buttonContainerElement.appendChild(buttonElement);

    return buttonContainerElement;
  }

  /**
   * Applies inline styles to toggle button
   *
   * @param {HTMLButtonElement} button - The button element to style
   */
  applyButtonStyles(button) {
    button.style.position = 'absolute';
    button.style.right = '0';
    button.style.cursor = 'pointer';
    button.style['white-space'] = 'nowrap';
  }

  /**
   * Toggles the visibility of the table of contents
   * Updates button text, ARIA attributes, and optionally saves state to localStorage
   *
   * @param {HTMLElement} tableOfContents - The navigation element to toggle
   */
  toggleTable(tableOfContents) {
    const isHidden = tableOfContents.style.display === 'none' || !tableOfContents.style.display;

    if (isHidden) {
      this.expandTable(tableOfContents);
    } else {
      this.collapseTable(tableOfContents);
    }
  }

  /**
   * Expands the table of contents
   *
   * @param {HTMLElement} tableOfContents - The navigation element to expand
   */
  expandTable(tableOfContents) {
    tableOfContents.style.display = 'block';
    this.buttonElement.textContent = this.hideText;
    this.buttonElement.setAttribute('aria-expanded', 'true');

    this.saveState(STATE.expanded);
  }

  /**
   * Collapses the table of contents
   *
   * @param {HTMLElement} tableOfContents - The navigation element to collapse
   */
  collapseTable(tableOfContents) {
    tableOfContents.style.display = 'none';
    this.buttonElement.textContent = this.showText;
    this.buttonElement.setAttribute('aria-expanded', 'false');

    this.saveState(STATE.collapsed);
  }

  /**
   * Saves the current TOC state to localStorage if remember-state is enabled
   *
   * @param {string} state - The state to save ('expanded' or 'collapsed')
   */
  saveState(state) {
    if (this.rememberState) {
      localStorage.setItem(STORAGE_KEY, state);
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

    if (this.collapsible) {
      this.setupCollapsibleNavigation(nav);
    }

    return nav;
  }

  /**
   * Sets up collapsible functionality for navigation element
   *
   * @param {HTMLElement} nav - The navigation element
   */
  setupCollapsibleNavigation(nav) {
    const initialState = this.getInitialState();

    if (initialState === STATE.collapsed) {
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

  /**
   * Determines initial state for collapsible TOC
   * Checks localStorage if remember-state is enabled, otherwise uses default-state
   *
   * @returns {string} Initial state ('collapsed' or 'expanded')
   */
  getInitialState() {
    if (this.rememberState) {
      const savedState = localStorage.getItem(STORAGE_KEY);

      if (savedState) {
        return savedState;
      }
    }

    return this.defaultState;
  }

  /**
   * Creates a single list item with a link for a heading
   *
   * @param {HTMLElement} el - The heading element to create a link for
   * @returns {HTMLLIElement} List item containing anchor link to the heading
   */
  createItem(el) {
    const item = this.el('li');
    const link = this.el('a');

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

      if (node.list.length) {
        li.appendChild(this.buildList(node.list));
      }

      list.appendChild(li);
    });

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
    const headings = this.getFilteredHeadings();

    headings.forEach(header => {
      const level = parseInt(header.tagName.substring(1));
      const node = {el: header, list: []};

      if (stack.length === 0) {
        stack.push({level, node});
        tree.push(node);
      } else {
        this.addNodeToTree(stack, tree, level, node);
      }
    });

    return tree;
  }

  /**
   * Gets all headings from article, filtered by configuration rules
   *
   * @returns {Array<HTMLElement>} Filtered array of heading elements
   */
  getFilteredHeadings() {
    return Array.from(this.article.querySelectorAll('h2,h3,h4,h5,h6'))
      .filter(header => this.shouldIncludeHeading(header));
  }

  /**
   * Determines if a heading should be included in the TOC
   * Checks against Ghost author name, ID presence, allowed levels, and exclude list
   *
   * @param {HTMLElement} header - The heading element to check
   * @returns {boolean} True if heading should be included
   */
  shouldIncludeHeading(header) {
    if (header.className === 'gh-article-author-name') {
      return false;
    }

    if (!header.id) {
      console.warn('Ghost TOC: Heading missing id attribute:', header.textContent);
      return false;
    }

    const level = parseInt(header.tagName.substring(1));

    if (!this.allowedLevels.includes(level)) {
      return false;
    }

    if (this.excludeIds.includes(header.id)) {
      return false;
    }

    return true;
  }

  /**
   * Adds a node to the tree structure at the appropriate level
   *
   * @param {Array} stack - Current stack of parent nodes
   * @param {Array} tree - Root tree array
   * @param {number} level - Heading level of the node
   * @param {Object} node - Node to add
   */
  addNodeToTree(stack, tree, level, node) {
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

  /**
   * Utility method to create a DOM element with optional class attribute
   *
   * @param {string} tagName - HTML tag name for the element
   * @param {string} [clazz] - Optional CSS class name to add to the element
   * @returns {HTMLElement} Created DOM element
   */
  el(tagName, clazz) {
    const el = document.createElement(tagName);

    if (clazz) {
      el.setAttribute('class', clazz);
    }

    return el;
  }
}

new TOC();
