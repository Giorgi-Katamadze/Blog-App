// Get the user ID and post ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const postId = urlParams.get('id');

// Fetch and display the specific post
function fetchPost() {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.json())
    .then((post) => {
      displaySinglePost(post);
      console.log(post);
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((res) => res.json())
        .then((comments) => {
          displayComments(comments);
          console.log(comments);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

// display post

function displaySinglePost(post) {
  const postContainer = document.getElementById('post');
  postContainer.innerHTML = `
    <div class="card w-75">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
        </div>
    </div>
  `;
}

//display comments

function displayComments(comments) {
  const commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = comments
    .map(
      (comment) => `
    <div class="card w-50 p-3">
            <div class="card-body">
                <h5 class="card-title">${comment.name}</h5>
                <p class="card-text">${comment.body}</p>
            </div>
            <div class="d-flex justify-content-end">
                <i>${comment.email}</i>
            </div>
    </div>
    `
    )
    .join('');
}

fetchPost();
