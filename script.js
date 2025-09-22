// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 요소들
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 스킬 바 요소들
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // 헤더 요소
    const header = document.querySelector('.header');
    
    // 모바일 메뉴 토글
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // 네비게이션 링크 클릭 시 스무스 스크롤
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 모바일 메뉴가 열려있으면 닫기
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // 스무스 스크롤
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 스크롤 시 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 스킬 바 애니메이션 (Intersection Observer 사용)
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                // 애니메이션 클래스 추가
                skillBar.style.width = width;
                skillBar.classList.add('animate');
                
                // 한 번만 실행되도록 관찰 중단
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    // 스킬 바들 관찰 시작
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // 현재 섹션에 따른 네비게이션 활성화
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // 활성 네비게이션 링크 업데이트
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 폼 제출 처리
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // 간단한 유효성 검사
            if (!name || !email || !subject || !message) {
                alert('모든 필드를 입력해주세요.');
                return;
            }
            
            // 이메일 형식 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 성공 메시지 (실제로는 서버로 전송)
            alert('메시지가 성공적으로 전송되었습니다!');
            this.reset();
        });
    }
    
    // 멀티 텍스트 타이핑 효과
    function multiTypeWriter(element, texts, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? deleteSpeed : typeSpeed;
            
            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 500; // 다음 텍스트로 넘어가기 전 잠시 대기
            }
            
            setTimeout(type, speed);
        }
        
        type();
    }
    
    // 페이지 로드 시 타이핑 효과 적용
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
    
    // 멀티 타이핑 효과 적용
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const texts = JSON.parse(typingText.getAttribute('data-texts'));
        multiTypeWriter(typingText, texts, 80, 40, 2000);
    }
    
    // 기존 타이핑 함수 (단일 텍스트용)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // 스크롤 애니메이션 (AOS 효과)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 초기 스타일 설정
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .project-card, .skill-category');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 스크롤 이벤트에 애니메이션 추가
    window.addEventListener('scroll', animateOnScroll);
    
    // 페이지 로드 시 즉시 실행
    animateOnScroll();
    
    // 부드러운 스크롤을 위한 추가 설정
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // 외부 클릭 시 모바일 메뉴 닫기
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // 윈도우 리사이즈 시 모바일 메뉴 닫기
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // 로딩 완료 후 초기 애니메이션
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 페이지 로드 시 body에 fade-in 효과
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// 추가 유틸리티 함수들
const utils = {
    // 디바운스 함수
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // 스로틀 함수
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 성능 최적화를 위한 스크롤 이벤트 최적화
const optimizedScrollHandler = utils.throttle(function() {
    // 스크롤 관련 로직들
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

