document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('version').value = currentVersion;

    const savedTheme = localStorage.getItem('tails7-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('tails7-theme', next);
        updateThemeIcon(next);
    });

    initMobileNavigation();

    if (document.querySelector('.article-sidebar')) {
        highlightCurrentSection();
        initSmoothScroll();
    }

    function updateThemeIcon(theme) {
        const iconPath = theme === 'dark'
            ? 'media/icons/brightness_7_48dp_E3E3E3_FILL0_wght200_GRAD200_opsz48.svg'
            : 'media/icons/moon_stars_48dp_E3E3E3_FILL0_wght200_GRAD200_opsz48.svg';
        themeIcon.src = iconPath;
    }

    generateNavigation(currentVersion);

    loadPage(currentPageId);

    document.getElementById('version').addEventListener('change', function() {
        currentVersion = this.value;
        generateNavigation(currentVersion);

        const firstSection = documentation[currentVersion][Object.keys(documentation[currentVersion])[0]];
        if (firstSection && firstSection.length > 0) {
            currentPageId = firstSection[0].id;
            loadPage(currentPageId);
        }
        
        closeMobileNavigation();
    });

    document.getElementById('content').addEventListener('click', function(e) {
        const buttonCard = e.target.closest('.button');
        
        if (buttonCard) {
            console.log('Button clicked:', buttonCard.href);
            
            if (buttonCard.href.includes('github.com') || buttonCard.getAttribute('target') === '_blank') {
                console.log('External link - allowing default behavior');
                return; 
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            const url = buttonCard.getAttribute('href');
            console.log('Internal link - loading:', url);
            loadContentPage(url);
            

            closeMobileNavigation();
        }
    });
});


function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navigation = document.getElementById('navigation');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    
    if (mobileMenuToggle && navigation && mobileNavOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            toggleMobileNavigation();
        });
        
        mobileNavOverlay.addEventListener('click', function() {
            closeMobileNavigation();
        });
        
        navigation.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                closeMobileNavigation();
            }
        });
    }
}

function toggleMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navigation = document.getElementById('navigation');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const body = document.body;
    
    if (mobileMenuToggle && navigation && mobileNavOverlay) {
        mobileMenuToggle.classList.toggle('active');
        navigation.classList.toggle('nav-open');
        mobileNavOverlay.classList.toggle('active');
        body.classList.toggle('nav-open');
    }
}

function closeMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navigation = document.getElementById('navigation');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const body = document.body;
    
    if (mobileMenuToggle && navigation && mobileNavOverlay) {
        mobileMenuToggle.classList.remove('active');
        navigation.classList.remove('nav-open');
        mobileNavOverlay.classList.remove('active');
        body.classList.remove('nav-open');
    }
}

function generateNavigation(version) {
    const navigation = document.getElementById('navigation');
    if (!navigation) {
        console.log('Navigation element not found');
        return;
    }
    
    navigation.innerHTML = '';
    
    const versionData = documentation[version];
    
    for (const sectionName in versionData) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'nav-section';
        
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = sectionName;
        sectionDiv.appendChild(sectionTitle);
        
        const linksList = document.createElement('ul');
        linksList.className = 'nav-links';
        
        versionData[sectionName].forEach(page => {
            const listItem = document.createElement('li');
            listItem.className = 'nav-item';
            
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = page.title;
            link.dataset.pageId = page.id;
            
            if (page.subcategories && page.subcategories.length > 0) {
                link.classList.add('has-subcategories');
                const expandIcon = document.createElement('span');
                expandIcon.className = 'expand-icon';
                expandIcon.innerHTML = '▶';
                
                expandIcon.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const sublist = this.parentNode.nextElementSibling;
                    if (sublist && sublist.classList.contains('nav-sublinks')) {
                        sublist.classList.toggle('expanded');
                        this.parentNode.classList.toggle('expanded');
                    }
                });
                
                link.appendChild(expandIcon);
                
                link.addEventListener('click', function(e) {
                    if (e.target.classList.contains('expand-icon')) {
                        return;
                    }
                    e.preventDefault();
                    currentPageId = this.dataset.pageId;
                    loadPage(currentPageId);
                    
                    updateActiveLinks(currentPageId);
                });
            } else {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    currentPageId = this.dataset.pageId;
                    loadPage(currentPageId);
                    
                    updateActiveLinks(currentPageId);
                });
            }
            
            listItem.appendChild(link);
            
            if (page.subcategories && page.subcategories.length > 0) {
                const sublist = document.createElement('ul');
                sublist.className = 'nav-sublinks';
                
                page.subcategories.forEach(subPage => {
                    const subListItem = document.createElement('li');
                    const subLink = document.createElement('a');
                    subLink.href = '#';
                    subLink.textContent = subPage.title;
                    subLink.dataset.pageId = subPage.id;
                    
                    subLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        currentPageId = this.dataset.pageId;
                        loadPage(currentPageId);
                        
                        updateActiveLinks(currentPageId);
                    });
                    
                    subListItem.appendChild(subLink);
                    sublist.appendChild(subListItem);
                });
                
                listItem.appendChild(sublist);
            }
            
            linksList.appendChild(listItem);
        });
        
        sectionDiv.appendChild(linksList);
        navigation.appendChild(sectionDiv);
    }
}

function updateActiveLinks(activePageId) {
    document.querySelectorAll('.nav-links a, .nav-sublinks a').forEach(a => {
        a.classList.remove('active');
        if (a.dataset.pageId === activePageId) {
            a.classList.add('active');
            
            const parentItem = a.closest('.nav-sublinks');
            if (parentItem) {
                parentItem.classList.add('expanded');
                const parentLink = parentItem.previousElementSibling;
                if (parentLink) {
                    parentLink.classList.add('expanded');
                }
            }
        }
    });
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('.article-content h2[id]');
    const navLinks = document.querySelectorAll('.article-sidebar .nav-link');

    function onScroll() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop - 50 && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
}

function initSmoothScroll() {
    document.querySelectorAll('.article-sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function loadPage(pageId) {
    const contentArea = document.getElementById('content');
    
    let pageData = null;
    
    function findPageInSection(section) {
        for (const page of section) {
            if (page.id === pageId) {
                return page;
            }

            if (page.subcategories) {
                const subPage = page.subcategories.find(sub => sub.id === pageId);
                if (subPage) {
                    return subPage;
                }
            }
        }
        return null;
    }
    
    for (const sectionName in documentation[currentVersion]) {
        const section = documentation[currentVersion][sectionName];
        pageData = findPageInSection(section);
        if (pageData) break;
    }
    
    if (!pageData) {
        contentArea.innerHTML = '<h1>Page not found</h1><p>The page you selected does not exist in this version of the documentation.</p>';
        return;
    }
    
    fetch(pageData.file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;
            
            if (document.querySelector('.article-sidebar')) {
                highlightCurrentSection();
                initSmoothScroll();
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            contentArea.innerHTML = `
                <h1>Oh uh! Error loading page o(TヘTo)</h1>
                <p>The page content could not be loaded. The file does not exist or a network error has occurred.</p>
                <p>Details: ${error.message}</p>
            `;
        });
    
    updateActiveLinks(pageId);
}

function loadContentPage(url) {
    const contentArea = document.getElementById('content');
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content page:', error);
            contentArea.innerHTML = `
                <h1>Error loading page o(TヘTo)</h1>
                <p>Could not load the page: ${url}</p>
                <p>Please check if the file exists.</p>
            `;
        });
}

function copyCode(button) {
    try {
        let textToCopy = '';
        
        const codeContainer = button.closest('.code-container');
        if (codeContainer) {
            const codeContent = codeContainer.querySelector('.code-content');
            if (codeContent) {
                textToCopy = codeContent.textContent || codeContent.innerText;
            }
        }
        
        if (!textToCopy) {
            const codeElement = button.parentElement.querySelector('.code-string, .code-object, .code-variable, .code-bool, .code-version');
            if (codeElement) {
                textToCopy = codeElement.textContent || codeElement.innerText;
                textToCopy = textToCopy.replace('Copy', '').trim();
            }
        }
        
        if (!textToCopy) {
            textToCopy = button.parentElement.textContent || button.parentElement.innerText;
            textToCopy = textToCopy.replace('Copy', '').trim();
        }
        
        if (!textToCopy) {
            throw new Error('No text found to copy');
        }
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy.trim()).then(() => {
                showCopySuccess(button);
            }).catch(err => {
                console.error('Clipboard API error:', err);
                useFallbackCopy(textToCopy, button);
            });
        } else {
            useFallbackCopy(textToCopy, button);
        }
        
    } catch (error) {
        console.error('Copy error:', error);
        showCopyError(button);
    }
}

function useFallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text.trim();
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            throw new Error('execCommand failed');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyError(button);
    } finally {
        document.body.removeChild(textArea);
    }
}

function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, 2000);
}

function showCopyError(button) {
    const originalText = button.textContent;
    button.textContent = 'Error!';
    
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

function initExampleGalleries() {
    const galleries = document.querySelectorAll('.example-gallery-container');
    
    galleries.forEach((gallery, galleryIndex) => {
        const slides = gallery.querySelectorAll('.example-slide');
        let currentSlide = 0;
        
        function showSlide(index) {

            slides.forEach(slide => slide.classList.remove('active'));
            
            slides[index].classList.add('active');
            
            currentSlide = index;
        }
        
        let slideInterval;
        
        function startAutoSlide() {
            slideInterval = setInterval(() => {
                let nextSlide = (currentSlide + 1) % slides.length;
                showSlide(nextSlide);
            }, 3000);
        }
        
        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }
        
        startAutoSlide();
        
        gallery.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        gallery.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        showSlide(0);
    });
}

function loadPage(pageId) {
    const contentArea = document.getElementById('content');
    
    let pageData = null;
    
    function findPageInSection(section) {
        for (const page of section) {
            if (page.id === pageId) {
                return page;
            }

            if (page.subcategories) {
                const subPage = page.subcategories.find(sub => sub.id === pageId);
                if (subPage) {
                    return subPage;
                }
            }
        }
        return null;
    }
    
    for (const sectionName in documentation[currentVersion]) {
        const section = documentation[currentVersion][sectionName];
        pageData = findPageInSection(section);
        if (pageData) break;
    }
    
    if (!pageData) {
        contentArea.innerHTML = '<h1>Page not found</h1><p>The page you selected does not exist in this version of the documentation.</p>';
        return;
    }
    
    fetch(pageData.file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;
            
            if (document.querySelector('.article-sidebar')) {
                highlightCurrentSection();
                initSmoothScroll();
            }
            
            if (document.querySelector('.example-gallery-container')) {
                initExampleGalleries();
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            contentArea.innerHTML = `
                <h1>Oh uh! Error loading page o(TヘTo)</h1>
                <p>The page content could not be loaded. The file does not exist or a network error has occurred.</p>
                <p>Details: ${error.message}</p>
            `;
        });
    
    updateActiveLinks(pageId);
}