// D.P.Enterprise — shared interaction layer
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{nav?.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');}));

// Reveal elements on every page
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Highlight current page automatically
const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
document.querySelectorAll('.nav a').forEach(link=>{const target=(link.getAttribute('href')||'').split('#')[0].toLowerCase();if(target===current)link.classList.add('active');});

const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

// Optional Supabase enquiry submission
const SUPABASE_URL='YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY='YOUR_SUPABASE_ANON_KEY';
const enquiryForm=document.getElementById('enquiryForm');
const formStatus=document.getElementById('formStatus');
if(enquiryForm){enquiryForm.addEventListener('submit',async event=>{event.preventDefault();const button=enquiryForm.querySelector('button[type="submit"]');const data=Object.fromEntries(new FormData(enquiryForm).entries());if(SUPABASE_URL==='YOUR_SUPABASE_URL'||SUPABASE_ANON_KEY==='YOUR_SUPABASE_ANON_KEY'){formStatus.textContent='Your enquiry is ready. Connect Supabase in script.js to enable database submission.';return;}button.disabled=true;button.textContent='Submitting…';formStatus.textContent='';try{const response=await fetch(`${SUPABASE_URL}/rest/v1/enquiries`,{method:'POST',headers:{'Content-Type':'application/json',apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`,Prefer:'return=minimal'},body:JSON.stringify(data)});if(!response.ok)throw new Error(await response.text());enquiryForm.reset();formStatus.textContent='Thank you. Your enquiry has been submitted successfully.';}catch(error){console.error(error);formStatus.textContent='Unable to submit right now. Please try again or contact us directly.';}finally{button.disabled=false;button.textContent='Submit Enquiry';}});}
