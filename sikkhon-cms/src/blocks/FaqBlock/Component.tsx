import React from 'react'
import { cn } from '@/utilities/ui'

type FAQItem = {
  question: string
  answer: {
    root: {
      children: Array<{
        type: string
        children: Array<{
          type: string
          children?: Array<{ text: string }>
          text?: string
        }>
      }>
    }
  }
}

export type FAQBlockProps = {
  faqItems: FAQItem[]
  className?: string
}

const renderContent = (content: any) => {
  if (content.type === 'paragraph') {
    return <p className="mb-2">{content.children.map((child: any) => child.text).join('')}</p>
  } else if (content.type === 'list') {
    return (
      <ul className="list-disc pl-5 mb-2">
        {content.children.map((item: any, index: number) => (
          <li key={index}>{item.children.map((child: any) => child.text).join('')}</li>
        ))}
      </ul>
    )
  }
  return null
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ faqItems, className }) => {
  return (
    <div className={cn('faq-section', className)}>
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      {faqItems.map((item, index) => (
        <div key={index} className="faq-item mb-4">
          <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
          <div>
            {item.answer && item.answer.root ? (
              item.answer.root.children.map((content, contentIndex) => (
                <React.Fragment key={contentIndex}>{renderContent(content)}</React.Fragment>
              ))
            ) : (
              <p className="mb-2">No answer provided</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
