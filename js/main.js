// loader ------>
window.addEventListener('load', () => {
  document.querySelector('.preloader').classList.add('loader-hide')
})

// to-top ----->
const upArrow = document.querySelector('.to-top')

// upArrow.addEventListener('click', () => {
  //   scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   })
  // window.open("request.html");
// })

window.addEventListener('scroll', () => {
  if (pageYOffset > 1000) {
    upArrow.style.transform = 'scale(1)'
  } else {
    upArrow.style.transform = 'scale(0)'
  }
})

// tab ------->
const btns = document.querySelectorAll('.products .tab-nav .btn')
const contents = document.querySelectorAll('.products .tab-content')

btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    removeActives()
    btn.classList.add('active')
    contents[index].classList.add('active')
  })
})

function removeActives() {
  btns.forEach((btn, idx) => {
    btn.classList.remove('active')
    contents[idx].classList.remove('active')
  })
}

// swiper------>
const swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,
  slidesPerView: 3,
  spaceBetween: 50,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1440: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    500: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    300: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    290: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
})

// popup ------->
const form = document.querySelector(".form");
const emailInp = document.querySelector("#exampleInputEmail1");
const mobileInp = document.querySelector("#exampleInputMobile1");

const close = document.querySelector('.close i');
const popupBtns = document.querySelectorAll('.show');
const popup = document.querySelector('.popup');
const products = document.querySelectorAll('.tab-content .product');

let targetProduct = ""

popupBtns.forEach(show => {
  show.addEventListener('click', (e) => {
    popup.classList.add('active')
    console.log(show.id);
    targetProduct = show.id
  })
});

close.addEventListener('click', () => {
  popup.classList.remove('active')
  clearAll()
})

const clearAll = () => {
  for (const key in errorMessages) {
    if (Object.hasOwnProperty.call(errorMessages, key)) {
      errorMessages[key] = null;
    }
  }
  targetProduct = ''
  document.querySelector(".email-error").textContent = errorMessages.emailError;
  document.querySelector(".phone-error").textContent = errorMessages.phoneError;
  document.querySelector('.box-name').classList.remove('error');
  document.querySelector('.box-phone').classList.remove('error');
}

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{7}$/g;
const TOKEN = "5808056247:AAHjTOtWgUeIM_1P56b7YQ8Em9wnjI6O5mo";
const BOT_ID = 1681739557;

const errorMessages = {
  emailError: null,
  phoneError: null,
};

const validateForm = function () {
  let message = "";
  const email = emailInp.value;
  const phone = mobileInp.value;

  if (email.length < 2) {
    errorMessages.emailError = "Имя должно быть не менее трех букв";
    document.querySelector('.box-name').classList.add('error');
  } else {
    errorMessages.emailError = null;
    document.querySelector('.box-name').classList.remove('error');
  }

  if (!phone.match(phoneRegex)) {
    errorMessages.phoneError = "Неверный формат телефона";
    document.querySelector('.box-phone').classList.add('error');
  } else {
    errorMessages.phoneError = null;
    document.querySelector('.box-phone').classList.remove('error');
  }
  document.querySelector(".email-error").textContent = errorMessages.emailError;
  document.querySelector(".phone-error").textContent = errorMessages.phoneError;

  const resultOfErrors = Object.values(errorMessages).every(
    (elem) => elem === null
  );

  if (resultOfErrors) {
    message = `Контакты клиента: %0A   Имя: ${email} %0A   Номер: ${phone} %0A   Продукт: ${targetProduct}`;
    return message;
  } else {
    return false;
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = validateForm();
  if (result) {
    // await fetch(
    //   `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${result}&parse_mode=html`
    // );
    await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${BOT_ID}&text=${result}&parse_mode=html`
    );

    emailInp.value = "";
    mobileInp.value = "";
    // alert('Ваше сообщение отправлено')
  }

  window.open("thx.html");
  // popup.classList.remove('active')
});