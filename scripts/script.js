let cancel = document.querySelector("#cancel");
let add = document.querySelector("#add");
let myLibrary = [];
var heading = 0;
var result = '';
var j=0; 

//constructor function for book object
function book(title,author,no_pages,read_or_not){
  this.title = title ;
  this.author = author ;
  this.no_pages = no_pages;
  this.read_or_not = read_or_not;

}


//clear input field when click cancel button
cancel.addEventListener("click",function(){
    clearAllFields();
});


//Clear all fields after clicking ADD button
function clearAllFields(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("no_pages").value = "";
    document.getElementById("read_or_not").checked = false;
}

//display books details as row in the display
function addBookToLibrary(myLibrary){
    j++;
        const mainContainer = document.getElementById("displayContainers");
    
        for(var i = 0 ; i< myLibrary.length;i++){
           const container = document.createElement("div");
           container.setAttribute("id","book"+j);
    
           container.setAttribute('style','border-radius:15px;border: 1px solid saddlebrown;width:800px;display: flex;justify-content: center;');    
    
            const div1 = document.createElement("div");
            div1.textContent = myLibrary[i].title;
            div1.classList.add("items");
            container.appendChild(div1);
    
            const div2 = document.createElement("div");
            div2.textContent = myLibrary[i].author;
            div2.classList.add("items");
            container.appendChild(div2);
    
            const div3 = document.createElement("div");
            div3.textContent = myLibrary[i].no_pages;
            div3.classList.add("items");
            container.appendChild(div3);
    
            const div4 = document.createElement("div");
            if(myLibrary[i].read_or_not == true){
                div4.innerHTML="<a href='#' onClick='readOrNot(this);'>Read</a>";
            }else{
                div4.innerHTML="<a href='#' onClick='readOrNot(this);'>Not Read</a";
            }
            div4.classList.add("items");
            container.appendChild(div4);
    
            const div5 = document.createElement("div");
            div5.innerHTML="<button>Delete</button";
            var bookiD = container.getAttribute("id");
            var myLibraryBooks = JSON.stringify(myLibrary);

           var deleteFun = "deleteDiv("+bookiD+","+i+","+myLibraryBooks+");";
           div5.setAttribute("onclick",deleteFun);
            div5.classList.add("items");
            container.appendChild(div5);
    
            mainContainer.appendChild(container);
        
        }
    }
    

//trigger click event when click button
add.addEventListener("click",function(){

  var title =  document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var no_pages = document.getElementById("no_pages").value;
  var read_or_not =  document.getElementById("read_or_not").checked;

  if(title && author && no_pages){
    myLibrary = [];
    clearAllFields();

    //create a book object
    var books = new book(title,author,no_pages,read_or_not);  
    // push the object to myLibrary Array
    myLibrary.push(books);

    if(heading ==0){addHeaderForBlocks();}
   addBookToLibrary(myLibrary);
  }else{
    alert("enter the details");
  }
});

//heading for the tables
function addHeaderForBlocks(){

    const mainContainer = document.getElementById("headerContainer");
    const headerContainer = document.createElement("div");
   // console.log(headerContainer);
    headerContainer.setAttribute('style','background-color: #e3eaa7;border-radius:15px;border: 1px solid saddlebrown;width:800px;display: flex;justify-content: center;');    

        const bookTitle = document.createElement("div");
        bookTitle.textContent = "Title";
        bookTitle.classList.add("items");
        headerContainer.appendChild(bookTitle);
    
        const bookAuthor = document.createElement("div");
        bookAuthor.textContent = "Author";
        bookAuthor.classList.add("items");
        headerContainer.appendChild(bookAuthor);
    
        const bookPages = document.createElement("div");
        bookPages.textContent = "No of Pages";
        bookPages.classList.add("items");
        headerContainer.appendChild(bookPages);
    
        const bookReadornot = document.createElement("div");
        bookReadornot.textContent = "Read or Not";
        bookReadornot.classList.add("items");
        headerContainer.appendChild(bookReadornot);
    
        const deleteRow = document.createElement("div");
        deleteRow.textContent = "Delete?";
        deleteRow.classList.add("items");
        headerContainer.appendChild(deleteRow);

        mainContainer.appendChild(headerContainer);
     
    heading++;

}



//Change read -> not read when user click on the option and vice versa
function readOrNot(readOrNot){
if(readOrNot.textContent === "Read") { readOrNot.textContent = "Not Read";}
else if(readOrNot.textContent === "Not Read") {readOrNot.textContent = "Read"; }
else{}
}

function deleteDiv(id,row,myLibrary){

   myLibrary.splice(row, 1);
   id.remove();

}