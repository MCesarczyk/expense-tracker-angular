import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { LoginFormComponent } from './login-form.component';

const meta: Meta<LoginFormComponent> = {
  title: 'Components/LoginForm',
  component: LoginFormComponent,
  decorators: [
    componentWrapperDecorator((story) => `<div style="width: 100%; height: 100vh; padding: 3rem">${story}</div>`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<LoginFormComponent>;

export const LoginForm: Story = {};
