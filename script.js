const dialog=document.querySelector('#project-dialog');
let lastTrigger;
const projectsPromise=fetch('projects.json').then(r=>{if(!r.ok)throw Error('Projects unavailable');return r.json()});
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',async()=>{
 try{
 const projects=await projectsPromise;
 const [number,title,meta,image,description,pages]=projects[Number(button.dataset.project)];
 lastTrigger=button;
 document.querySelector('#dialog-title').textContent=title;
 document.querySelector('#dialog-meta').textContent=number+' / '+meta;
 document.querySelector('#dialog-description').textContent=description;
 const sheets=document.querySelector('#sheets');sheets.replaceChildren();
 for(const page of pages){const link=document.createElement('a');link.href='assets/sheet-'+String(page).padStart(2,'0')+'.webp';link.target='_blank';link.rel='noopener';link.setAttribute('aria-label',title+' — open sheet '+page+' at full size');const img=document.createElement('img');img.src=link.href;img.alt=title+' — original portfolio sheet '+page;img.loading='lazy';link.append(img);sheets.append(link)}
 dialog.showModal();dialog.scrollTop=0;
 }catch(e){window.open('Malavika-Nair-Portfolio.pdf','_blank','noopener')}
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>lastTrigger?.focus());
