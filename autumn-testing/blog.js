  let loadedContent = false;

  fetch('https://script.google.com/macros/s/AKfycbzFVHWMBNfvmtr8D07lJoZ-PpPo80O8x89jWX2iU6jf1Rz4znaEMEYNEEEPBcDLSJ8-/exec')

    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })

    .then(posts => {
      if (!loadedContent) {
        clearInterval(loadingInterval);
        loadingElement.remove();
      }

      if (!loadedContent) {
        posts.forEach(post => {
          const { title, body, month, year, date } = post;
          const blogItem = document.createElement('div');
          blogItem.id = 'blog-item';

          blogItem.innerHTML = `
          <img src="icons/notepad.png" alt="" style="padding-top: 1px; width:20px; height: 20px; background-color: transparent; padding-right: 2px;">
          <div id="blog-item-text">${title}</div>
        `;

          blogItem.addEventListener('click', () => {
            loadBlogContent(post);
            document.querySelector('#blog #header .window-title').innerHTML = `<img src="icons/search-file.png" alt="" style="padding-top: 1px; width:20px; height: 20px; background-color: transparent; padding-right: 2px;">&nbsp;${year}/${month}/${date}`;
          });

          postsContainer.appendChild(blogItem);
          loadedContent = true;
        });
      }
    })