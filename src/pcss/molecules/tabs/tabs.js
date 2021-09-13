(() => {
    class Tabs {
      constructor(element) {
        this.element = element;
        this.buttons = new Map([...element.querySelectorAll('[role="tab"]')]
            .map(entry => [entry.getAttribute('aria-controls'), entry])
        );
        this.containers = new Map([...document.querySelectorAll('[role="tabpanel"]')]
            .filter(entry => this.buttons.has(entry.id))
            .map(entry => [entry.id, entry])
        );
        this.current = null;

        this.init();
      }

      select(name) {
        for (const [key, button] of this.buttons.entries()) {
          if (key === name) {
            button.setAttribute('tabindex', '0');
          } else {
            button.setAttribute('tabindex', '-1');
          }

          button.setAttribute('aria-selected', key === name);
        }

        for (const [key, container] of this.containers.entries()) {
          if (key === name) {
            container.removeAttribute('hidden');
          } else {
            container.setAttribute('hidden', true);
          }
        }
      }

      init() {
        const keys = [...this.buttons.keys()];
        const active = [...this.buttons.values()].find(button => {
          return (button.getAttribute('aria-selected') === 'true');
        });

        for (const [key, button] of this.buttons.entries()) {
          button.addEventListener('click', event => {
            event.preventDefault();
            this.select(key);
          });
        }

        this.select(active !== null ? active.getAttribute('aria-controls') : keys[0]);
      }

      static create(element) {
        return new Tabs(element);
      }
    }

    const containers = document.querySelectorAll('[role="tablist"]');

  for (const container of containers) {
    Tabs.create(container);
  }
})();
