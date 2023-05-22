const postsContainer = document.getElementById('posts');
const paginationContainer = document.getElementById('pagination');
const postsPerPage = 10;
let currentPage = 1;
let currentPosts = [];

// fetch data

async function fetchPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => {
      currentPosts = capitalizeFirstLetter(data);
      displayPosts(currentPage);
      console.log(currentPosts);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// get data in document

function displayPosts(page) {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = currentPosts.slice(startIndex, endIndex);
  postsContainer.innerHTML = paginatedPosts
    .map(
      (post) => `
      <a href="postPage.html?id=${post.id}">
      <div class="card col-8 mx-auto p-3 pt-5 my-5">
        <div class="d-flex gap-3 mt-3">
            <p class="id">#${post.id}</p>
            <h5 class="card-title">${post.title}</h5> 
        </div>
            <p class="card-text">${post.body}</p>
      </div>
      </a>
    `
    )
    .join('');
  updatePagination(page);
}

// pagination

function updatePagination() {
  const totalPages = Math.ceil(currentPosts.length / postsPerPage);
  paginationContainer.innerHTML = '';

  if (totalPages > 1) {
    const createButton = (label, onClick, disabled = false, isSelected = false) => {
      const button = document.createElement('button');
      button.textContent = label;
      button.onclick = onClick;
      button.disabled = disabled;

      if (isSelected) {
        button.style.borderBottom = '1px solid #6EEB83';
      }

      return button;
    };

    paginationContainer.appendChild(
      createButton('Previous', () => goToPage(currentPage - 1), currentPage === 1)
    );

    for (let i = 1; i <= totalPages; i++) {
      paginationContainer.appendChild(
        createButton(i, () => goToPage(i), i === currentPage, i === currentPage)
      );
    }

    paginationContainer.appendChild(
      createButton(
        'Next',
        () => goToPage(currentPage + 1),
        currentPage === totalPages
      )
    );
  }
}

function goToPage(page) {
  currentPage = page;
  displayPosts(currentPage);
}

// capitalize all text element's first letter

function capitalizeFirstLetter(data) {
  return data.map((post) => {
    return {
      ...post,
      title: post.title.charAt(0).toUpperCase() + post.title.slice(1),
      body: post.body.charAt(0).toUpperCase() + post.body.slice(1)
    };
  });
}

fetchPosts();

const create = document.getElementById('create');
create.addEventListener('click', () => {
  window.location.href = 'create.html';
});
