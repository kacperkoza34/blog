'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
};

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
  optAuthorsListSelector = '.authors ul';

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let html = '';
  console.log(customSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for( let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  //  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = { max: '0', min: '99'};
  for(let tag in tags){
    console.log(tags[tag]);
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
   }
  return params;
}
function generateTags(){
  let allTags = {};
  let allTagsHTML = '';
  const articles = document.querySelectorAll(optArticleSelector);
  for( let article of articles) {
    const tagList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray){
      if(!allTags.hasOwnProperty(tag)){
      allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
      const linkHTMLData = {id:'tag-' + tag, title: tag};
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + ' ' + linkHTML;
    }

    article.querySelector(optArticleTagsSelector).innerHTML = html;
  }

  const tagList = document.querySelector('.tags');
  for(let tag in allTags){
    allTagsHTML += '<li><a href="#tag-' + tag + '">' +  tag + '(' + allTags[tag] + ')</a></li>';
  }
  tagList.innerHTML = allTagsHTML;
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);
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

function addClickListenersToTagsSideBar(){
  const tagsHref = document.querySelectorAll('#list-tags a');
  for(let link of tagsHref){
    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();
addClickListenersToTagsSideBar();

function generateAuthors(){
  const authorsNames = document.querySelectorAll('article');
  for(let author of authorsNames){
    let html = '';
    const authorName = author.getAttribute('data-author');
    const linkHTMLData = {id: 'tag-' + authorName, title: authorName};
    const linkHTML = templates.articleLink(linkHTMLData);
    author.querySelector('.post-author').innerHTML = linkHTML;
  }
}
generateAuthors();

function generateAuthorsList(){
  let authorList = { };
  const authorsNames = document.querySelectorAll('article');
  let html = '';
  for(let author of authorsNames){
    const authorName = author.getAttribute('data-author');
    if(!authorList[authorName]){
      authorList[authorName] = true;
      const linkHTMLData = { id: 'tag-' + authorName, title: authorName };
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + ' ' + linkHTML;
    }
  }
  document.querySelector('.authors').innerHTML = html;
}
generateAuthorsList();

function authorsListClickHandler(event){
  event.preventDefault();
  const clickedAuthor = this;
  const author = clickedAuthor.getAttribute('href');
  const postAuthor = author.replace('#tag-', '');
  const activeAuthor = document.querySelectorAll('.authors .active')
  console.log('akjbkb');
  for (let links of activeAuthor){
    links.classList.remove('active');
  }
  const authorHref = document.querySelectorAll('a[href="' + author + '"]');
  for (let tags of authorHref){
    tags.classList.add('active');
  }
  generateTitleLinks('[data-author="' + postAuthor + '"]');
}

function addClickListenersToAuthorList(){
  console.log('akjbkb');
  const authorHref = document.querySelectorAll('.sidebar .authors a');
  for(let link of authorHref){
    link.addEventListener('click', authorsListClickHandler);
  }
}
addClickListenersToAuthorList();

function authorsClickHandler(event){
  event.preventDefault();
  const clickedAuthor = this;
  const author = clickedAuthor.getAttribute('href');
  const postAuthor = author.replace('#tag-', '');
  const activeAuthor = document.querySelectorAll('.post-author .active')
  for (let links of activeAuthor){
    links.classList.remove('active');
  }
  const authorHref = document.querySelectorAll('a[href="' + author + '"]');
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
