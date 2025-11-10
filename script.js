        document.addEventListener('DOMContentLoaded', () => {
            
            // --- MODAL YÖNETİCİSİ ---
            const modal = document.getElementById('item-modal');
            const modalOverlay = document.getElementById('modal-overlay');
            const modalClose = document.getElementById('modal-close');
            
            const modalImage = document.getElementById('modal-image');
            const modalName = document.getElementById('modal-name');
            const modalDesc = document.getElementById('modal-desc');
            const modalPrice = document.getElementById('modal-price');

            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Veriyi tıklanan öğeden al
                    const name = item.querySelector('.item-name').innerText;
                    const desc = item.querySelector('.item-desc').innerText;
                    const price = item.querySelector('.item-price').innerText;
                    // Resim src'sini al ve daha büyük bir placeholder ile değiştir
                    const imgSrc = item.querySelector('.item-image').src.replace('100x100', '400x300'); // Modal için daha büyük resim
                    
                    // Modal'ı verilerle doldur
                    modalImage.src = imgSrc;
                    modalName.innerText = name;
                    modalDesc.innerText = desc;
                    modalPrice.innerText = price;
                    
                    // Modal'ı göster
                    modal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden'; // Arka plan kaydırmayı engelle
                });
            });

            // Modal'ı kapatma fonksiyonu
            const closeModal = () => {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto'; // Kaydırmayı geri aç
            };

            // Kapatma butonlarına olay ekle
            modalClose.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', closeModal);

            // ESC tuşu ile modalı kapatma
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            });

            // --- AKTİF KATEGORİ VURGULAYICI ---
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('#category-nav a');

            // Sticky nav yüksekliğini hesaba katmak için rootMargin'i daha dinamik yapabiliriz
            const navElement = document.getElementById('category-nav');
            const navHeight = navElement ? navElement.offsetHeight : 0;

            const observerOptions = {
                root: null, // viewport'a göre
                rootMargin: `-${navHeight + 20}px 0px -50% 0px`, // Sticky nav yüksekliği + biraz boşluk
                threshold: 0 // Section'ın herhangi bir kısmı göründüğünde tetikle
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        // Tüm aktif sınıfları kaldır
                        navLinks.forEach(link => {
                            link.classList.remove('active-nav');
                        });
                        
                        // Sadece ilgili linke aktif sınıfı ekle
                        const activeLink = document.querySelector(`#category-nav a[href="#${id}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active-nav');
                        }
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            sections.forEach(section => {
                observer.observe(section);
            });
            
            // --- BAŞA DÖN BUTONU YÖNETİCİSİ ---
            const toTopBtn = document.getElementById('back-to-top-btn');

            // Butonun görünürlüğünü ayarla
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) { // 300px aşağı kaydırınca göster
                    toTopBtn.classList.add('show');
                } else {
                    toTopBtn.classList.remove('show');
                }
            });

            // Tıklayınca başa dön
            toTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // HTML'de zaten 'smooth' ayarlı ama JS'den de teyit etmek iyi.
                });
            });

        });
