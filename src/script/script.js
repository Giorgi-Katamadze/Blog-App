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
      currentPosts = data;
      displayPosts(currentPage);
      console.log(data);
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
      <a href="postPage.html?userId=${post.userId}&id=${post.id}">
      <div class="card p-3" style="width: 18rem;">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text mb-5">${post.body}</p>
            <div class="id">
                <p>${post.id}</p>
            </div>
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
    const createButton = (label, onClick, disabled = false) => {
      const button = document.createElement('button');
      button.textContent = label;
      button.onclick = onClick;
      button.disabled = disabled;
      return button;
    };

    paginationContainer.appendChild(
      createButton('Previous', () => goToPage(currentPage - 1), currentPage === 1)
    );

    for (let i = 1; i <= totalPages; i++) {
      paginationContainer.appendChild(
        createButton(i, () => goToPage(i), i === currentPage)
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

fetchPosts();
