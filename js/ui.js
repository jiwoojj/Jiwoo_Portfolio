class D2UI {
  constructor(settings) {
    this.settings = settings ? settings : {
      toggle: {
        target: '.js-toggle'
      }
    };

    // Initialize
    this.init();
  }

  init() {
    this.dock();
    this.toggle();
    this.toggleClass();
    this.tab();
    this.inputPassword();
  }

  dock() {
    const $dockItemMainLink = document.querySelector('.dock-item-main .dock-link');
    if (!$dockItemMainLink) return false;
    $dockItemMainLink.addEventListener('click', (e) => {
      e.target.parentElement.classList.toggle('active');
    });
  }

  toggle() {
    const toggleSettings = this.settings.toggle ? this.settings.toggle : {
      target: '.js-toggle'
    };

    if ( toggleSettings ) {
      const target = toggleSettings.target;
      const toggleButtons = document.querySelectorAll(target);

      toggleButtons.forEach(button => {
        let toggleTarget = button.hasAttribute('data-href') ?  button.getAttribute('data-href') : button.hasAttribute('href') ? button.getAttribute('href') : undefined;

        // Check target properties
        if ( !toggleTarget ) return false;

        const toggleEls = document.querySelectorAll(toggleTarget);

        if ( !button.classList.contains('active') ) {
          toggleEls.forEach(toggleEl => {
            toggleEl.style.display = 'none';
          });
        }

        button.addEventListener('click', (e) => {
          e.preventDefault();
          button.classList.toggle('active');

          if ( button.classList.contains('active') ) {
            toggleEls.forEach(toggleEl => {
              toggleEl.style.display = 'block';
            });
          } else {
            toggleEls.forEach(toggleEl => {
              toggleEl.style.display = 'none';
            });
          }
        });
      });
    }
  }

  toggleClass() {
    const toggleElems = document.querySelectorAll('[data-toggle-class]');

    toggleElems.forEach(elem => {
      elem.addEventListener('click', () => {
        elem.classList.toggle(elem.getAttribute('data-toggle-class'));
      });
    });
  }

  tab() {
    const tabs = document.querySelectorAll('[data-tab]');

    if ( !tabs.length ) return false;

    for (const tab of tabs) {
      const tabHeader = tab.querySelector('[data-tab-item]').parentElement;
      const tabBody = tab.querySelector('[data-tab-content]').parentElement;

      // HTML 구조 체크
      if ( !tabHeader ) {console.error('[data-tab-item] 를 하나의 부모 엘리먼트 안에 index 로 접근 가능하도록 HTML 을 작성해주세요.'); return false;}
      if ( !tabBody ) {console.error('[data-tab-content] 를 하나의 부모 엘리먼트 안에 index 로 접근 가능하도록 HTML 을 작성해주세요.'); return false;}

      // 사용 변수 목록
      const tabItems = tabHeader.children;
      const tabContents = tabBody.children;
      const cssMode = tab.getAttribute('data-tab') === 'css';

      for (let i = 0; i < tabItems.length; i++) {
        const thisTabItem = tabItems[i];
        const thisTabContent = tabContents[i];
        const hasTarget = thisTabItem.getAttribute('data-tab-item') !== ""; // data-tab-item 의 target 유무 체크

        // 탭 초기화
        if ( hasTarget ) {
          const target = thisTabItem.getAttribute('data-tab-item');
          const targetContent = document.querySelector(target);

          if ( thisTabItem.classList.contains('active') ) {
            targetContent.classList.add('active');
            if ( cssMode ) targetContent.style.display = 'block';
          } else {
            targetContent.classList.remove('active');
            if ( cssMode ) targetContent.style.display = 'none';
          }
        } else {
          if ( thisTabItem.classList.contains('active') ) {
            thisTabContent.classList.add('active');
            if ( cssMode ) thisTabContent.style.display = 'block';
          } else {
            thisTabContent.classList.remove('active');
            if ( cssMode ) thisTabContent.style.display = 'none';
          }
        }
        
        // 탭 클릭
        thisTabItem.addEventListener('click', e => {
          for (const tabItem of tabItems) {
            tabItem.classList.remove('active');
          }

          thisTabItem.classList.add('active');

          for (const tabContent of tabContents) {
            tabContent.classList.remove('active');
            if ( cssMode ) tabContent.style.display = 'none';
          }

          if ( hasTarget ) {
            const target = thisTabItem.getAttribute('data-tab-item');
            const targetContent = document.querySelector(target);

            if ( thisTabItem.classList.contains('active') ) {
              targetContent.classList.add('active');
              if ( cssMode ) targetContent.style.display = 'block';
            } else {
              targetContent.classList.remove('active');
              if ( cssMode ) targetContent.style.display = 'none';
            }
          } else {
            if ( thisTabItem.classList.contains('active') ) {
              thisTabContent.classList.add('active');
              if ( cssMode ) tabContents[i].style.display = 'block';
            } else {
              thisTabContent.classList.remove('active');
              if ( cssMode ) tabContents[i].style.display = 'none';
            }
          }
        });
      }
    }
  }

  inputPassword() {
    const $inputEyes = document.querySelectorAll('.input-eye');

    $inputEyes.forEach($eye => {
      $eye.addEventListener('click', () => {
        $eye.classList.toggle('visible');

        if ( $eye.classList.contains('visible') ) {
          $eye.parentElement.querySelector('input[type="password"]').setAttribute('type', 'text');
        } else {
          $eye.parentElement.querySelector('input[type="text"]').setAttribute('type', 'password');
        }
      });
    });
  }

  popLayerOpen(target) {
    const popup = document.querySelector(target);
    popup.style.display = 'block';
    document.querySelector('html, body').style.overflow = 'hidden';
  }

  popLayerClose(target) {
    const popup = document.querySelector(target);
    popup.style.display = 'none';
    document.querySelector('html, body').style.overflow = 'visible';
  }
}

$(function () {
  window.UI = new D2UI({
    toggle: {
      target: '.js-toggle'
    }
  });
});
