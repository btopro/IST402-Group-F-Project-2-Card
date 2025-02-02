// dependencies / things imported
import { LitElement, html, css } from 'lit';
import './LearningBanner.js';
import './LearningIcon.js';
import './LearningScaffold.js';

// this is the base path to the assets calculated at run time
// this ensures that assets are shipped correctly when building the demo
// on github pages, or when people reuse assets outside your elements in production
// because this won't change we can leverage as an internal variable without being
// declared in properties. This let's us ship the icons while referencing them correctly

// EXPORT (so make available to other documents that reference this file) a class, that extends LitElement
// which has the magic life-cycles and developer experience below added
export class LearningCard extends LitElement {
  // a convention I enjoy so you can change the tag name in 1 place
  static get tag() {
    return 'learning-card';
  }

  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.type = 'question';
    this.topText = '';
    this.bottomText = '';
  }

  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      // reflect allows state changes to the element's property to be leveraged in CSS selectors
      type: { type: String, reflect: true },
      topText: { type: String, reflect: true },
      bottomText: { type: String, reflect: true },
    };
  }

  // updated fires every time a property defined above changes
  // this allows you to react to variables changing and use javascript to perform logic
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'type' && this[propName] === 'science') {
        this.topText = 'Unit 1';
        this.bottomText = 'Chem Conventions';
      } else if (propName === 'type' && this[propName] === 'question') {
        this.topText = 'Unit Review';
        this.bottomText = 'Practice Problems';
      } else if (propName === 'type' && this[propName] === 'idea') {
        this.topText = 'Unit Summary';
        this.bottomText = 'Things to remember';
      }
    });
  }

  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        padding: 15px;
        width: max(60%);
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      .content {
        margin-left: 2%;
      }
    `;
  }

  // HTML - specific to Lit

  /*
        <learning-header class="BannerElements" topText="Test Top" bottomText="Test Bottom" fontSize=20></learning-header>
      ignore this for now{
        drop-shadow(0 0 0.75rem black);
      }
  */
  render() {
    return html`
      <learning-scaffold>
        <div slot="header">
          <learning-banner
            type="${this.type}"
            topText="${this.topText}"
            bottomText="${this.bottomText}"
          ></learning-banner>
        </div>
        <div class="content" slot="body">
          <slot></slot>
        </div>
      </learning-scaffold>
    `;
  }

  // HAX specific callback
  // This teaches HAX how to edit and work with your web component
  /**
   * haxProperties integration via file reference
   * <img class="BannerElements" part="icon" src="${this.myIcon}" alt="" />
   */
  static get haxProperties() {
    return {
      canScale: false,
      canPosition: false,
      canEditSource: true,
      contentEditable: true,
      gizmo: {
        title: 'Learning Card',
        description: 'An element that you have to replace / fix / improve',
        icon: 'credit-card',
        color: 'blue',
        groups: ['Content', 'Presentation', 'Education'],
      },
      settings: {
        configure: [
          {
            property: 'type',
            title: 'Type',
            description: 'Identifies the card',
            inputMethod: 'select',
            options: {
              science: 'Science',
              math: 'Math',
            },
          },
        ],
        advanced: [],
      },
      demoSchema: [
        {
          tag: LearningCard.tag,
          properties: {
            type: 'science',
          },
          content:
            "<p slot='banner'>This tag renders in the header/banner</p><ul><li>This renders</li><li>Below the tag</li></ul>",
        },
      ],
    };
  }
}
