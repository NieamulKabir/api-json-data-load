function loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => displayPosts(data))
}
loadPosts()

function displayPosts(posts) {
    const postContainer = document.getElementById('posts');
    for (let post of posts) {
        const div = document.createElement('div');
        div.innerHTML = `
            <h1> ${post.id}</h1>
            <h3>${post.title}</h3>
            <p>${post.body} </p>
        `
        postContainer.appendChild(div);
        console.log(post);
    }
}