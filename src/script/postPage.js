// Get the user ID and post ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Fetch and display the specific post
async function fetchPost() {
  try {

    //GET
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await postResponse.json();
    console.log(post);
    //GET Commments
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
    const comments = await commentsResponse.json();
    console.log(comments);
    //GET Users
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const user = await userResponse.json();
    const userAddress = user.address
    const userCompany = user.company
    console.log(user);
    //PUT/PATCH
    const editResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        title: 'New Title',
        body: 'New Body'
      })
    });
    const editResult = await editResponse.json();
    console.log(editResult);
    //DELETE
    const deleteResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE'
    });
    const deleteResult = await deleteResponse.json();
    console.log(deleteResult);

    displaySinglePost(post, user, userAddress, userCompany);
    displayComments(comments);
    commentCount(comments);
  } catch (error) {
    console.error('Error:', error);
  }
}


// display post
function displaySinglePost(post, user,userAddress, userCompany) {
  const postContainer = document.getElementById('post');
  postContainer.innerHTML = `
    <header class="d-flex justify-content-end col-12 gap-5">
        <div class="d-flex flex-column gap-5 justify-content-center mx-5 p-5">
            <button id="delete"><i class="fa-solid fa-trash"></i></button>
            <button id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
        <div class="card userCard w-85">
          <div class="card-body d-flex gap-5 justify-content-end">
              <div>
                  <h5 class="card-title">User: </br>${user.name}</h5>
                  <p class="card-text">${user.username}</p>
                  <p class="card-text">Address: ${userAddress.city}, ${userAddress.street} ${userAddress.suite} </p>
                  <p class="card-text">Number: ${user.phone}</p>
              </div>
              <div>
                  <h5 class="card-title">Company: </br> ${userCompany.bs}</h5>

              </div>
          </div>
        </div>
    </header>
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
    <div class="card comment p-3 col-10">
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

function commentCount(comments) {
  const commentCount = document.getElementById('commentCount')
  commentCount.innerHTML = `
  <h1>${comments.length} Comments</h1>
  `
}

fetchPost();


const homeBtn = document.getElementById('home')
home.addEventListener('click', () =>{
window.location.href = 'index.html'
})
const create = document.getElementById('create');
create.addEventListener('click', () => {
  window.location.href = 'create.html';
});
