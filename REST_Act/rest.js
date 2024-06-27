document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result');

    function clearAndShowResult(content) {
        resultDiv.innerHTML = content;
        resultDiv.style.display = 'block';
    }

    function jsonToTable(json) {
        const keys = Object.keys(json[0]);
        let table = '<table border="1"><tr>';
        keys.forEach(key => {
            table += `<th>${key}</th>`;
        });
        table += '</tr>';
        json.forEach(item => {
            table += '<tr>';
            keys.forEach(key => {
                table += `<td>${item[key]}</td>`;
            });
            table += '</tr>';
        });
        table += '</table>';
        return table;
    }

    async function getAllPosts() {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        clearAndShowResult(jsonToTable(data));
    }

    async function getPost() {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts/10');
        const data = await response.json();
        clearAndShowResult(JSON.stringify(data, null, 2));
    }

    async function createPost() {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1
            })
        });
        const data = await response.json();
        clearAndShowResult(`New post created with ID: ${data.id}`);
    }

    async function replacePost() {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts/12', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 12,
                title: 'foo',
                body: 'bar',
                userId: 1
            })
        });
        const data = await response.json();
        clearAndShowResult(JSON.stringify(data, null, 2));
    }

    async function updatePost() {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts/12', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Updated title'
            })
        });
        const data = await response.json();
        clearAndShowResult(JSON.stringify(data, null, 2));
    }

    async function deletePost() {
        await fetch('http://jsonplaceholder.typicode.com/posts/12', {
            method: 'DELETE'
        });
        clearAndShowResult('Post with ID 12 deleted successfully');
    }

    document.getElementById('getAllPosts').addEventListener('click', getAllPosts);
    document.getElementById('getPost').addEventListener('click', getPost);
    document.getElementById('createPost').addEventListener('click', createPost);
    document.getElementById('replacePost').addEventListener('click', replacePost);
    document.getElementById('updatePost').addEventListener('click', updatePost);
    document.getElementById('deletePost').addEventListener('click', deletePost);
});
