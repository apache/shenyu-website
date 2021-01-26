import { $$ } from './utils'
import Particles from '../particles.min.js';

export default function() {
  if (!$$('.ss-project-card') || $$('.ss-project-card').length === 0) {
    return
  }
  
  $$('.ss-project-card')[0].classList.add('-selected');
  $$('.feature-section')[0].classList.add('-display');
  $$('.introduction-section')[0].classList.add('-display');

  $$('.ss-project-card').forEach((project ,i) => {
    project.addEventListener('click', () => {
        $$('.ss-project-card').forEach(item=>{
          item.classList.remove('-selected')
        })
        $$('.introduction-section').forEach(item=>{
          item.classList.remove('-display')
        })
        $$('.feature-section').forEach(item=>{
          item.classList.remove('-display')
        })
        project.classList.add('-selected');
        if($$('.introduction-section')[i].children && $$('.introduction-section')[i].children.length > 0){
          $$('.introduction-section')[i].classList.add('-display');
        }
        if($$('.feature-section')[i].children && $$('.feature-section')[i].children.length > 0){
          $$('.feature-section')[i].classList.add('-display');
        }
    })
  })

  Particles.init({
    selector: '.particles_bg',
    maxParticles: 80,
    connectParticles: true,
    sizeVariations: 1,
    color: '#b1cef3',
    responsive: [
      {
        breakpoint: 768,
        options: {
          maxParticles: 200,
          color: '#48F2E3',
          connectParticles: false
        }
      }, {
        breakpoint: 425,
        options: {
          maxParticles: 100,
          connectParticles: true
        }
      }, {
        breakpoint: 320,
        options: {
          maxParticles: 0
        }
      }
    ]
  });  
}