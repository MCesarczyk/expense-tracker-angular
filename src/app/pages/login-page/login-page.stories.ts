import { applicationConfig, componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { LoginPageComponent } from './login-page.component';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<LoginPageComponent> = {
  title: 'Pages/LoginPage',
  component: LoginPageComponent,
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
type Story = StoryObj<LoginPageComponent>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {};
