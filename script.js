const figures=[...document.querySelectorAll('.photo-grid figure')];
const buttons=[...document.querySelectorAll('.photo-open')];
const filters=[...document.querySelectorAll('.filter')];
const dialog=document.querySelector('#lightbox');
const bigImage=document.querySelector('#lightbox-image');
let current=0;let opener=null;
function visibleButtons(){return buttons.filter(b=>!b.closest('figure').hidden)}
function showPhoto(index){const list=visibleButtons();current=(index+list.length)%list.length;const btn=list[current];const img=btn.querySelector('img');bigImage.src=img.src;bigImage.alt=img.alt;document.querySelector('#lightbox-caption').textContent=btn.dataset.caption;document.querySelector('#photo-count').textContent=`${current+1} / ${list.length}`}
buttons.forEach(btn=>btn.addEventListener('click',()=>{opener=btn;showPhoto(visibleButtons().indexOf(btn));dialog.showModal();document.body.classList.add('modal-open')}));
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(f=>{f.classList.toggle('active',f===btn);f.setAttribute('aria-pressed',String(f===btn))});figures.forEach(f=>f.hidden=btn.dataset.filter!=='all'&&f.dataset.sport!==btn.dataset.filter);document.querySelector('.gallery-status').textContent=`Showing ${visibleButtons().length} photographs for ${btn.textContent.trim()}.`}));
document.querySelector('#close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(opener)opener.focus()});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
document.querySelector('#previous-photo').addEventListener('click',()=>showPhoto(current-1));
document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(current+1));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){showPhoto(current+1);event.preventDefault()}if(event.key==='ArrowLeft'){showPhoto(current-1);event.preventDefault()}});
