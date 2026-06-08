async function registerUser(){

    const name = document.getElementById('name').value;

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    const bio = document.getElementById('bio').value;

    const response = await fetch('http://localhost:3000/register', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name,
            email,
            password,
            bio
        })

    });

    const data = await response.text();

    alert(data);

}
async function loginUser(){

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.text();

    alert(data);

}
async function createPost(){

    const content = document.getElementById('content').value;

    const response = await fetch('http://localhost:3000/posts', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            userName: 'Atchaya',
            content
        })

    });

    const data = await response.text();

    alert(data);

}

async function loadPosts(){

    const response = await fetch('http://localhost:3000/posts');

    const posts = await response.json();

    const postDiv = document.getElementById('posts');

    postDiv.innerHTML = '';

    posts.forEach(post => {

        postDiv.innerHTML += `

            <div>
                 <h3>${post.userName || 'Unknown User'}</h3>

                 <p>${post.content || 'No Content'}</p>

                <p>Likes: ${post.likes}</p>

                <hr>

            </div>

        `;

    });

}

loadPosts();