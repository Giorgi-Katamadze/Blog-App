const title = document.getElementById('title');
const body = document.getElementById('body');
const submitBtn = document.getElementById('submitBtn');

const validate = (event) => {
  event.preventDefault();

  if (title.value === '') {
    document.querySelector('.title-span').classList.remove('show')
  } else if (body.value.trim() === '') {
    document.querySelector('.body-span').classList.remove('show')
  } else{
    submit()
  }
};

async function submit() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "title": title.value,
        "body": body.value
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      Swal.fire({
        title: 'Great! You added a post',
        text: 'Want to check it?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Go to Post',
        cancelButtonText: 'Main Page',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'yourPost.html';
        } else if (result.isDismissed) {
          window.location.href = 'index.html';
        }
      });
    }
  } catch (error) {
    console.log('Error:', error);
    Swal.fire({
      title: 'Error',
      text: 'Please check if you filled everything correctly',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

submitBtn.addEventListener('click', validate);
