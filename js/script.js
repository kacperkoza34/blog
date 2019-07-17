'use strict';

//document.getElementById('test-button').addEventListener('click', function(){
//  const links = document.querySelectorAll('.titles a');
//  console.log('links:', links);
//});



const titleClickHandler = function(event){
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');


  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');


  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}

  /* get 'href' attribute from the clicked link */

    let elementAttribute = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  let correctArticle = document.querySelector(elementAttribute);

  /* add class 'active' to the correct article */
  correctArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for( let article of articles) {
    article.innerHTML = '';
  }

    /* get the article id */
//    const article = document.querySelector(optArticleSelector);
    const articleId = articles.getAttribute('id');

    /* find the title element */


    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;


    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();
