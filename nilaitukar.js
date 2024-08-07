        async function getExchangeRate() {
            const apiKey = 'cefda62fe396abd14bbd23a2 '; // Ganti dengan API key Anda
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
            const data = await response.json();
            return data.conversion_rates.IDR;
        }

        function formatNumber(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        document.addEventListener('DOMContentLoaded', async () => {
            const exchangeRate = await getExchangeRate();
            const priceElements = document.querySelectorAll('[data-price]');

            priceElements.forEach(element => {
                element.addEventListener('click', () => {
                    const usdPrice = element.getAttribute('data-price');
                    const idrPrice = (usdPrice * exchangeRate).toFixed(2);
                    const formattedPrice = formatNumber(idrPrice);
                    element.closest('.productCheckout').querySelector('.price-idr').textContent = `Rp ${formattedPrice}`;
                });
            });
        });

