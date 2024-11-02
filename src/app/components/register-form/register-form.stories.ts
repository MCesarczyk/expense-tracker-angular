import { applicationConfig, componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { RegisterFormComponent } from './register-form.component';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<RegisterFormComponent> = {
  title: 'Components/RegisterForm',
  component: RegisterFormComponent,
  decorators: [
    componentWrapperDecorator((story) => `<div style="width: 100%; height: 100vh; padding: 3rem">${story}</div>`),
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<RegisterFormComponent>;

export const RegisterForm: Story = {};
