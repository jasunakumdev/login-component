import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import VisibilitySvg from './assets/visibility.svg'
import VisibilityOffSvg from './assets/visibility-off.svg'

@customElement('login-component')
export class LoginComponent extends LitElement {
  @property({ type: String }) backgroundImage: string = ''
  @property({ type: String }) backgroundColor: string = ''
  @property({ type: String, attribute: false }) email: string = ''
  @property({ type: String, attribute: false }) password: string = ''
  @property({ type: String }) errorMessage: string = ''
  @property({ type: Boolean, attribute: false }) togglePassword: boolean = false
  @property({ type: Boolean }) invalidCredentials: boolean = false
  @property({ type: String }) buttonColor: string = '#3f51b5'
  @property({ type: String }) loginTitle: string = 'Sign In'
  @property({ type: String }) buttonText: string = 'Sign In'
  @property({ type: String }) emailTitle: string = 'Email'
  @property({ type: String }) passwordTitle: string = 'Password'
  @property({ type: String }) showPassword: boolean = true
  @property({ type: Function }) onSignIn = () => {}

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: var(--background-color);
      background-image: var(--background-image);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .container {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 24px;
      border-radius: 8px;
      background: white;
      max-width: 400px;
      width: 100%;
      padding-bottom: 48px;
    }
    h1 {
      text-align: center;
      margin-bottom: 24px;
      padding-left: 12px;
    }
    .field {
      margin-bottom: 16px;
      padding-left: 12px;
    }
    .field label {
      display: flex;
      margin-bottom: 8px;
    }
    .field input {
      width: calc(100% - 40px);
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
    .field input[type='password'] {
      width: calc(100% - 20px);
      padding-right: 20px;
    }
    .field .eye-icon {
      position: relative;
      cursor: pointer;
      right: 35px;
      z-index: 1;
      top: 2px;
    }

    .password-container {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .field .eye-icon {
      cursor: pointer;
    }

    .error-message {
      color: red;
      text-align: center;
      margin-top: 8px;
    }
    .button {
      display: block;
      width: 92%;
      padding: 10px;
      background-color: var(--button-color);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-left: 12px;
    }
    .button:hover {
      background-color: #303f9f;
    }
  `

  firstUpdated() {
    if (this.backgroundImage) {
      this.style.setProperty(
        '--background-image',
        `url(${this.backgroundImage})`
      )
    }
    if (this.buttonColor) {
      this.style.setProperty('--button-color', this.buttonColor)
    }

    if (this.backgroundColor) {
      this.style.setProperty('--background-color', this.backgroundColor)
    }
  }

  updated(changedProperties: any) {
    if (changedProperties.has('backgroundImage')) {
      this.style.setProperty(
        '--background-image',
        `url(${this.backgroundImage})`
      )
    }
    if (changedProperties.has('buttonColor')) {
      this.style.setProperty('--button-color', this.buttonColor)
    }
    if (changedProperties.has('backgroundColor')) {
      this.style.setProperty('--background-color', this.backgroundColor)
    }
  }

  private handleEmailChange(e: Event) {
    const target = e.target as HTMLInputElement
    this.email = target.value
  }

  private handlePasswordChange(e: Event) {
    const target = e.target as HTMLInputElement
    this.password = target.value
  }

  private togglePasswordVisibility() {
    this.togglePassword = !this.togglePassword
  }

  private async handleSignIn() {
    const detail = { email: this.email, password: this.password }
    const event = new CustomEvent('signin', {
      bubbles: true,
      composed: true,
      detail,
    })
    this.dispatchEvent(event)
  }

  render() {
    return html`
      <div class="container">
        <h1>${this.loginTitle}</h1>
        <div class="field">
          <label for="email">${this.emailTitle}</label>
          <input
            type="email"
            id="email"
            .value="${this.email}"
            @input="${this.handleEmailChange}"
            required
          />
        </div>
        ${this.showPassword
          ? html` <div class="field">
              <label for="password">${this.passwordTitle}</label>
              <div class="password-container">
                <input
                  type="${this.togglePassword ? 'text' : 'password'}"
                  id="password"
                  .value="${this.password}"
                  @input="${this.handlePasswordChange}"
                  required
                />
                <span
                  class="eye-icon"
                  @click="${this.togglePasswordVisibility}"
                >
                  ${this.togglePassword
                    ? html`<img
                        height="25"
                        width="25"
                        src=${VisibilitySvg}
                        alt="Hide password"
                      />`
                    : html`<img
                        height="25"
                        width="25"
                        src=${VisibilityOffSvg}
                        alt="Show password"
                      />`}
                </span>
              </div>
            </div>`
          : ``}

        <button class="button" @click="${this.handleSignIn}">
          ${this.buttonText}
        </button>
        ${this.invalidCredentials
          ? html`<div class="error-message">${this.errorMessage}</div>`
          : ''}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-screen': LoginComponent
  }
}
