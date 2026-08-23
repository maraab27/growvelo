import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/courses_/lessons/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/courses_/lessons/"!</div>
}
