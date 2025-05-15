"use strict"
function createElement(tag, attrs = {}, ...children) {
    const elem = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'className') elem.className = value;
      else if (key === 'src') elem.src = value;
      else 
      elem.setAttribute(key, value);
    }
    children.forEach(child => elem.append(child));
    return elem;
  }
  
  function renderProducts(products) {
    const container = document.getElementById('products');
    products.forEach(product => {
      const card = createElement('div', { className: 'product-card', style: 'border: solid black 1px'},
        createElement('img', { src: product.imageUrl, alt: product.title }),
        createElement('h3', {}, product.title),
        createElement('p', {}, `$${product.price}`),
        createElement('button', {id : "infoButton"}, createElement('a', {href : product.infoButton, style: 'padding: 15px;text-decoration: none;'}, "Info"))
      );
      container.appendChild(card);
    });
  }
  
  function renderSections(sections) {
    document.getElementById('header').textContent = sections.headerText;
    document.getElementById('banner').src = sections.bannerImage;
  
    const infoContainer = document.getElementById('info-sections');
    sections.infoSections.forEach(info => {
      const block = createElement('div', { className: 'info-block' },
        createElement('h4', {}, info.title),
        createElement('p', {}, info.content)
      );
      infoContainer.appendChild(block);
    });
  }
  
  Promise.all([
    //GET(default) - get, POST- send data, PUT - replace ,DELETE - delete
    fetch('products.json', {method: "GET"}).then(response => {
      if (!response.ok) throw new Error('Failed to load products');
      return response.json();
    }),
    fetch('sections.json', {method: "GET"}).then(response => {
      if (!response.ok) throw new Error('Failed to load sections');
      return response.json();
    })
  ])
  .then(([productsData, sectionsData]) => {
    console.log(productsData);
    console.log(sectionsData);
    return [productsData, sectionsData];
}
  )
  .then(([productsData, sectionsData]) => {
    renderProducts(productsData);
    renderSections(sectionsData);
  })
  .catch(err => {
    console.error(err);
    const main = document.getElementById('products');
    const header = document.getElementById('header');
    main.innerHTML = `<p>Could not load product data. Please try again later</p>`;
    header.innerHTML = `<p>Page content could not be loaded</p>`;
  });
  