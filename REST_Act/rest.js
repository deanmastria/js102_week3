// Event listener that executes once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
                                                                            // Get the result div element
    const resultDiv = document.getElementById('result');

                                                                            // Function to clear the result div and show the new content
    function clearAndShowResult(content) {
        resultDiv.innerHTML = content;
        resultDiv.style.display = 'block';
    }

                                                                            // Function to convert JSON data to an HTML table
    function jsonToTable(json) {
                                                                            // Get the keys from the first object in the JSON array
        const keys = Object.keys(json[0]);
                                                                            // Start creating the table HTML with a border and header row
        let table = '<table border="1"><tr>';
                                                                            // Add a header cell for each key
        keys.forEach(key => {
            table += `<th>${key}</th>`;
        });
        table += '</tr>';
                                                                            // Add a row for each item in the JSON array
        json.forEach(item => {
            table += '<tr>';
                                                                            // Add a cell for each key value
            keys.forEach(key => {
                table += `<td>${item[key]}</td>`;
            });
            table += '</tr>';
        });
        table += '</table>';
        return table;
    }

                                                                            // Async function to fetch all posts and display them in a table
    async function getAllPosts() {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        clearAndShowResult(jsonToTable(data));
    }

                                                                            // Async function to fetch a single post and display it as a JSON string
    async function getPost() {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts/10');
        const data = await response.json();
        clearAndShowResult(JSON.stringify(data, null, 2));
    }

                                                                            // Async function to create a new post and display the new post's ID
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

                                                                            // Async function to replace a post with a new one and display the updated post
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

                                                                            // Async function to update a post's title and display the updated post
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

                                                                            // Async function to delete a post and display a success message
    async function deletePost() {
        await fetch('http://jsonplaceholder.typicode.com/posts/12', {
            method: 'DELETE'
        });
        clearAndShowResult('Post with ID 12 deleted successfully');
    }

                                                                            // Add event listeners to buttons for the various actions
    document.getElementById('getAllPosts').addEventListener('click', getAllPosts);
    document.getElementById('getPost').addEventListener('click', getPost);
    document.getElementById('createPost').addEventListener('click', createPost);
    document.getElementById('replacePost').addEventListener('click', replacePost);
    document.getElementById('updatePost').addEventListener('click', updatePost);
    document.getElementById('deletePost').addEventListener('click', deletePost);
});

