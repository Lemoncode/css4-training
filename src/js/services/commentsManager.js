(function (App){
    App.commentsManager = function(commentsDictionary) {
        const comments = document.getElementById('comments');
        if(!comments) {
            throw 'No comments block added, or missing id.'
        }

        document.body.addEventListener('click', (event) => {
            comments.classList.remove('comments-off');
            const areaComment = commentsDictionary
                .find(existAreaComment(event.target));
            fillComments(areaComment);
        });

        const existAreaComment = (area) => 
            (element) => area.classList.contains(Object.keys(element)[0]);

        const fillComments = (areaComment) => {
            let key;
            if(areaComment) {
                key = Object.keys(areaComment)[0];
            }
            comments.innerText = (areaComment) ? 
                `${areaComment[key]}, related style: ${key}` : 
                'No comment added for this site area'; 
        }; 

        document.body.addEventListener('dblclick', (event) => {
            comments.classList.add('comments-off');
        });
    };
})(App);