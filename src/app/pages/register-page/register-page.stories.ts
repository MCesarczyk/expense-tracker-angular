import { applicationConfig, componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { provideHttpClient } from '@angular/common/http';
import { RegisterPageComponent } from './register-page.component';

const meta: Meta<RegisterPageComponent> = {
  title: 'Pages/RegisterPage',
  component: RegisterPageComponent,
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
type Story = StoryObj<RegisterPageComponent>;

export const RegisterPage: Story = {};
