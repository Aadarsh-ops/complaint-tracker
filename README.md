# **Ticket Management System**

## **Project Overview**

The **Ticket Management System** is a web application built with **Angular** designed to provide a dynamic and user-friendly interface for managing tickets. The system includes features like ticket search, filtering, pagination, and editing. Additionally, it offers shared components, a centralized loading spinner, and user-friendly dialogs for a seamless user experience.

## **Technologies Used**
- **Angular**: A platform for building single-page applications (SPA).
- **Angular Material**: A UI component library that provides pre-built components such as tables, buttons, dialogs, and paginators, ensuring a modern, consistent user interface.
- **RxJS**: A library for reactive programming to handle asynchronous operations, like API calls.
- **ESLint**: A tool for maintaining code quality by enforcing coding standards and best practices.
- **Interceptor**: Used to manage HTTP requests globally, including adding authentication headers and showing loading indicators.
- **Lazy Loading**: Improves performance by loading only necessary modules on demand.
- **Shared Components**: Reusable components such as the loader and dialog boxes for consistent UI elements across the app.
- **Angular Paginator**: Implemented to paginate large datasets efficiently.

## **Key Features**
- **Ticket List View**: Displays a paginated list of tickets with functionality for search, filter, and pagination.
- **Edit Ticket**: Allows users to update ticket details with a simple interface.
- **Dialog Box**: A confirmation dialog is shown before performing actions such as editing a ticket.
- **Loading Spinner**: A global spinner to indicate when data is being loaded in the background.
- **Lazy Loading**: Modules are lazily loaded to optimize the initial page load time.

---

### **Folder Structure**
1. **Shared**: Contains reusable components, such as the loader and dialog boxes, that can be used across different modules.
2. **Modules**: Houses the ticket management components and additional features that may be added in the future.
3. **Services**: Contains the service files responsible for making API calls and interacting with backend services.
4. **Models**: Contains TypeScript models like `ticket.model.ts` for strongly typed response data.

---

## **Approach and Implementation**

### **1. ESLint Configuration**
I’ve integrated **ESLint** to enforce consistent code quality throughout the project. ESLint helps catch potential bugs and ensures adherence to coding standards. To install and configure ESLint, run the following command:

```bash
ng add @angular-eslint/schematics
 HTTP Request Interceptor
To manage HTTP requests efficiently, I’ve created an HTTP Interceptor that globally handles request loading states and adds authentication headers where necessary. The interceptor is also responsible for globally handling errors like 404 or 500 and providing feedback to the user.

To generate the interceptor, use the following command:

bash
Copy
Edit
ng generate interceptor shared/interceptors/loading
3. Shared Loader Component
I’ve created a shared loader component to display a consistent loading spinner across the app. It is shown globally whenever an HTTP request is in progress.

4. Shared Dialog Component
Angular Material Dialogs are used to create a reusable dialog box component. This dialog box is displayed for confirmation before performing actions like editing or deleting tickets, ensuring that users make intentional decisions.

5. Lazy Loading for Performance Optimization
To improve performance and reduce the initial load time, Lazy Loading is implemented for modules. This ensures that only the necessary modules are loaded when the user navigates to specific routes. For example, the tickets module is lazy-loaded like this:

typescript
Copy
Edit
const routes: Routes = [
  {
    path: 'tickets',
    loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule)
  }
];
6. Consistent UI with Angular Material
To maintain a modern and consistent user interface, Angular Material components such as tables, buttons, and pagination controls are used throughout the application. This ensures that all pages follow the same design guidelines, offering a cohesive experience.

7. Pagination with Angular Material
For managing large datasets, MatPaginator is used to implement pagination in the ticket list. This allows users to navigate through pages easily, improving usability and performance. The paginator is bound to the ticket-list.component.ts to control pagination for the ticket data.

