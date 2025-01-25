'use client';
import Welcome from '../Features/auth/components/templates/welcome'
import AuthLayout from '../Features/auth/components/templates/authLayout'
import FormProvider from '../context/form'

export default function WelcomePage() {
  return (
    <AuthLayout>
          <FormProvider>
        <Welcome />
        </FormProvider>
    </AuthLayout>
  )
}
