import { Category, Company } from '@prisma/client'
import React from 'react'

interface CompanySettingsContainerProps {
  company: Company & {
    categories: Category[]
  }
}

interface SocialMediaLink {
  name: string
  url: string
  id: string
}
export default function CompanySettingsContainer({
  company,
}: CompanySettingsContainerProps) {
  return (
    <div>
      <div>NAME: {company.name}</div>
      <div>URL: doghouse.mx/{company.slug}</div>
      <div>DESCRIPTION: {company.description}</div>
      <div>VERSION: {company.pro}</div>
      <div>SINCE: {company.createdAt.toString()}</div>
      <div>EMAIL: {company.email}</div>
      <div>PHONE: {company.phone}</div>

      <div>
        Categorias:
        {company.categories.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      <div>WEBSITE: {company.website}</div>
      <div>STREET: {company.streetAddress}</div>
      <div>CITY: {company.city}</div>
      <div>LOCALITY: {company.locality}</div>
      <div>STATE: {company.state}</div>
      <div>ZIP: {company.zip}</div>
      <div>
        Links:{' '}
        {JSON.parse(company.socialMediaLinks as string).map(
          (item: SocialMediaLink) => (
            <li key={item.id}>{item.url}</li>
          ),
        )}
      </div>
    </div>
  )
}
