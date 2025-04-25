// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 联系表单提交
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // 简单验证
        if (!name || !email || !message) {
            alert('请填写必填字段');
            return;
        }
        
        // 模拟表单提交
        alert('感谢您的留言！我们会尽快回复。');
        contactForm.reset();
    });
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// 图片懒加载
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 回退到传统的懒加载
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(img => {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const modalImg = modal.querySelector('img');
    const images = document.querySelectorAll('.image-gallery img');
  
    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      });
    });
  
    // 点击关闭
    modal.addEventListener('click', () => {
      modal.style.display = 'none';
      modalImg.src = '';
    });
  
    // Esc 键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.style.display = 'none';
        modalImg.src = '';
      }
    });
  });
  
 // 初始化每组轮播的索引
let currentIndex = [0, 0]; // 用一个数组存储多个轮播的当前索引

// 更新每组轮播的显示
function updateCarousel(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

// 下一张图片
function nextImage(carouselIndex) {
    const carouselId = `carousel${carouselIndex + 1}`;
    const images = document.querySelectorAll(`#${carouselId} .carousel-image`);
    const totalImages = images.length;

    currentIndex[carouselIndex] = (currentIndex[carouselIndex] + 1) % totalImages;
    updateCarousel(carouselId, currentIndex[carouselIndex]);
}

// 上一张图片
function prevImage(carouselIndex) {
    const carouselId = `carousel${carouselIndex + 1}`;
    const images = document.querySelectorAll(`#${carouselId} .carousel-image`);
    const totalImages = images.length;

    currentIndex[carouselIndex] = (currentIndex[carouselIndex] - 1 + totalImages) % totalImages;
    updateCarousel(carouselId, currentIndex[carouselIndex]);
}

