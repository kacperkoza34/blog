'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  let elementAttribute = clickedElement.getAttribute('href');
  let correctArticle = document.querySelector(elementAttribute);
  correctArticle.classList.add('active');
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author';

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let html = '';
  console.log(customSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for( let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){

  let allTags = [];

  const articles = document.querySelectorAll(optArticleSelector);
  for( let article of articles) {
    const tagList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html = html + ' ' + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
      allTags.push(linkHTML);
      }
    }
    article.querySelector(optArticleTagsSelector).innerHTML = html;
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}
generateTags();


function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeLinks = document.querySelectorAll('li .active')
  for (let links of activeLinks){
    links.classList.remove('active');
  }
  const tagsHref = document.querySelectorAll('a[href="' + href + '"]');
  for (let tags of tagsHref){
    tags.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const tagsHref = document.querySelectorAll('.post-tags a');
  for(let link of tagsHref){
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors(){
    const authorsNames = document.querySelectorAll('article');
    for(let author of authorsNames){
      let html = '';
      const authorName = author.getAttribute('data-author');
      const linkHTML = '<a href="#tag-' + authorName + '">by ' + authorName + '</a>';
      html = html + ' ' + linkHTML;
      author.querySelector('.post-author').innerHTML = html;
    }
}
generateAuthors();

function authorsClickHandler(event){
  event.preventDefault();
  const clickedAuthor = this;
  const author = clickedAuthor.getAttribute('href');
  const postAuthor = author.replace('#tag-', '');
  const activeAuthor = document.querySelectorAll('.post-author .active')
  for (let links of activeAuthor){
    links.classList.remove('active');
  }
  const authorHref = document.querySelectorAll('a[href="' + postAuthor + '"]');
  for (let tags of authorHref){
    tags.classList.add('active');
  }
  generateTitleLinks('[data-author="' + postAuthor + '"]');
}

function addClickListenersToAuthor(){
  const authorHref = document.querySelectorAll('.post-author a');
  for(let link of authorHref){
    link.addEventListener('click', authorsClickHandler);
  }
}
addClickListenersToAuthor();
