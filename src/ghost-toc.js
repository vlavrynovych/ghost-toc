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

class TOC {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => this.onLoad());
  }

  onLoad() {
    this.article = document.querySelector('article');
    const toc = this.article.querySelector('toc');
    if (!toc) return;
    this.collapsible = toc.getAttribute("collapsible") === 'true';
    this.showText = toc.getAttribute("show-text") || 'Show';
    this.hideText = toc.getAttribute("hide-text") || 'Hide';
    toc.appendChild(this.createStyles(toc));
    toc.appendChild(this.createHtml(toc));
  }

  createStyles(toc) {
    const style = this.el('style');
    style.textContent = `
      toc #toc-container { width: 100%; }
      toc .toc-title { text-align: center; margin-bottom: 15px }
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
    return style;
  }

  createHtml(toc) {
    const container = this.el("div", 'toc-container');
    if(this.collapsible) {
      container.appendChild(this.createShowHideButton());
    }
    const title = this.createTitle(toc.getAttribute("title"));
    title && container.appendChild(title);
    container.appendChild(this.createNavigation());
    return container;
  }

  createTitle(title) {
    if (!title) return
    const titleElement = this.el('H2', 'toc-title');
    titleElement.textContent = title;
    return titleElement;
  }

  createShowHideButton() {
    const buttonElement = this.el('a', 'toc-show-hide-button');
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

  toggleTable(tableOfContents) {
    if (tableOfContents.style.display === 'none' || !tableOfContents.style.display) {
      tableOfContents.style.display = 'block';
      this.buttonElement.textContent = this.hideText;
    } else {
      tableOfContents.style.display = 'none';
      this.buttonElement.textContent = this.showText;
    }
  }

  createNavigation() {
    const nav = this.el('nav', 'table-of-contents');
    nav.setAttribute('role', 'navigation');
    nav.appendChild(this.buildList(this.prepareStructure()));
    if(this.collapsible) {
      nav.style.display = 'none';
      this.buttonElement.addEventListener('click', () => this.toggleTable(nav));
    }
    return nav;
  }

  createItem(el) {
    const item = this.el('li'),
          link = this.el('a');
    link.setAttribute('href', `#${el.id}`);
    link.textContent = el.textContent;
    item.appendChild(link);
    return item;
  }

  buildList(tree) {
    const list = this.el('ul');
    tree.forEach(node => {
      const li = this.createItem(node.el);
      if (node.list.length) li.appendChild(this.buildList(node.list))
      list.appendChild(li)
    })
    return list;
  }

  prepareStructure() {
    const tree = [];
    const stack = [];
    Array.from(this.article.querySelectorAll('h2,h3,h3,h4,h5,h6'))
      .filter(header => header.className !== 'gh-article-author-name')
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

  el(tagName, clazz) {
    const el = document.createElement(tagName);
    if (clazz) el.setAttribute('class', clazz);
    return el;
  }
}

new TOC();