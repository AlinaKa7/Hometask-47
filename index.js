function displayPost() {
  const postId = document.getElementById('post-id').value;

  const idContainer = document.querySelector('.idContainer'); 
  idContainer.innerHTML = '';

  if(!postId) {
    const errTitle = document.createElement('p');
    errTitle.innerText = `Please enter ID number as requested.`;
    errTitle.style.color = 'red';
    idContainer.style.display = 'block';
    idContainer.append(errTitle);

    return;
  }

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
      return Promise.reject({ status: res.status, statusText: res.statusText });
      }
    })
    
    .then(post => {
      idContainer.style.display = 'block';
      const pTitle = document.createElement('p');
      const pId = document.createElement('p');
      const pBody = document.createElement('p');
      const commentBtn = document.createElement('button');

      commentBtn.addEventListener('click', () => {
        getComment(postId, idContainer);
      })

      pTitle.innerText = `Title of the post: ${post.title}`;
      pId.innerText = `ID Number: ${post.id}`;
      pBody.innerText = post.body;
      commentBtn.innerText = `Get comments`;
      commentBtn.className = 'comment-btn';

      idContainer.append(pTitle);
      idContainer.append(pId);
      idContainer.append(pBody);
      idContainer.append(commentBtn);
    })
    .catch(err => {
      const errTitle = document.createElement('p');
      errTitle.innerText = `Sorry, the post is not found. Try another ID.`, err.statusText;
      idContainer.style.display = 'block';
      errTitle.style.color = 'red';
      idContainer.append(errTitle);
    })
}

function getComment(postId, idContainer) {
  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-container';
  commentContainer.style.display = 'block';

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
      return Promise.reject({ status: res.status, statusText: res.statusText });
      }
    })
    
    .then(comments => {
      comments.forEach(comment => {
        const pComment = document.createElement('p');
        pComment.innerText = comment.body;
        commentContainer.append(pComment);
      });

      idContainer.append(commentContainer);
    })
    .catch(err => {
      const errTitle = document.createElement('p');
      errTitle.innerText = `Sorry, comments are not found.`, err.statusText;
      errTitle.style.color = 'red';
      commentContainer.append(errTitle);
      idContainer.append(commentContainer);
    });
}
