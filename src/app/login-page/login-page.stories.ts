import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { LoginPageComponent } from './login-page.component';

const meta: Meta<LoginPageComponent> = {
  title: 'Pages/LoginPage',
  component: LoginPageComponent,
  decorators: [
    componentWrapperDecorator((story) => `<div style="padding: 3rem">${story}</div>`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<LoginPageComponent>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {};
