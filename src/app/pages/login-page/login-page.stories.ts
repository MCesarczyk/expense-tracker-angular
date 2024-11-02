import { applicationConfig, componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { LoginPage } from './login-page';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  decorators: [
    componentWrapperDecorator((story) => `<div style="width: 100%; height: 100vh">${story}</div>`),
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<LoginPage>;

export const _LoginPage: Story = {};
