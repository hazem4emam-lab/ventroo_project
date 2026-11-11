# Ventro

**Course:** Electronic Business Development (BINF 503) · Winter 2026
**Instructor:** Dr. Nourhan Hamdi
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa, Ms. Mariam Khalid, Mr. Younes Zied, Mr. Mahmoud Hani

## 1. Team

| Name | Student ID | Tutorial group | GitHub username |
|---|---|---|---|
| Anas Ahmed Seheri | 13008336 | Lab 5 | aa5864393-ctrl |
| Saif Ashraf | 13003677 | Lab 4 | saifmokamal-cloud |
| Salma Moataz Eldesouky | 14003143 | Tutorial 4 | Salmamoatazbicc-prog |
| Rawda Mohamed Elmetwally | 14003722 | Tutorial 4 | rawdaelmetwally |
| Abdelrahman Mohamed Khaled | 14003240 | Lab 4 | boshy2005-pixel |
| Hazem Adel | 13006278 | Tutorial 4 | hazem4emam-lab |

## 2. The idea

Ventro is a web-based skilled workers marketplace that connects customers with service professionals in Egypt. Customers can browse electricians, plumbers, carpenters, painters, and air-conditioning technicians, view professional profiles, save professionals to a favourites list, and submit service requests. Professionals can create and manage their profiles and respond to customer requests. Ventro aims to make finding and arranging local home services more convenient and organized.

## 3. Features

### 3.1 The full product

- Registration and login for customers and professionals.
- Customer and professional account management.
- Professional profiles with service categories, skills, experience, and location.
- Browse and search professionals by service category and location.
- View professional profile details.
- Save and remove professionals from a favourites list.
- Submit service requests with a description, address, and preferred date.
- Accept or reject incoming service requests.
- Update service request status.
- View current and previous service requests.
- Submit and edit ratings and reviews after completed services.
- View ratings and reviews on professional profiles.
- Notifications about new requests and request status changes.
- Search and filter professionals by availability and price.

### 3.2 The use cases we will build

| # | Use case | What the user does | What they see | What is stored |
|---|---|---|---|---|
| 1 | Registration and login | Registers with a name, email, password, and account role (customer or professional, customer by default); logs in with email and password | Their dashboard, with their name and account role | A User document with a bcrypt-hashed password |
| 2 | Professional profile management | A professional creates, updates, or deletes their profile: service category, skills, years of experience, city, service area, phone, and description | Their professional profile with the saved information, or a confirmation that it was deleted | A Professional document linked to the User |
| 3 | Browse and save professionals | A customer browses professionals and adds or removes a professional from favourites | A list of professionals and the customer's saved favourites | A Favorite document linking the customer and professional |
| 4 | Create service request | A customer selects a professional and submits a service description, service address, and preferred date; the customer can also cancel a request that is still pending | A confirmation showing the submitted request and its current status (pending, or cancelled after cancelling) | A ServiceRequest document linked to the customer and professional |
| 5 | Manage service requests | A professional views incoming requests and accepts or rejects them; the professional can update the status of an accepted request | The request with its updated status | The updated ServiceRequest document |
| 6 | Reviews and ratings | A customer submits, edits, or deletes a rating and comment for a completed service request that belongs to them | The submitted review and rating on the professional's profile | A Review document linked to the customer, professional, and service request |

## 4. Who owns what

| Member | Use case |
|---|---|
| Anas Ahmed Seheri | 1. Registration and login |
| Saif Ashraf | 2. Professional profile management |
| Salma Moataz Eldesouky | 3. Browse and save professionals |
| Rawda Mohamed Elmetwally | 4. Create service request |
| Abdelrahman Mohamed Khaled | 5. Manage service requests |
| Hazem Adel | 6. Reviews and ratings |

## 5. Data model

### User

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored hashed, never as plain text
  role: {
    type: String,
    enum: ["customer", "professional"],
    default: "customer",
  },
}, { timestamps: true });
```

### Professional

```js
const professionalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  serviceCategory: {
    type: String,
    enum: ["electrician", "plumber", "carpenter", "painter", "AC technician"],
    required: true,
  },
  skills: [{ type: String }],
  experienceYears: { type: Number, min: 0, required: true },
  description: { type: String, default: "" },
  city: { type: String, required: true },
  serviceArea: { type: String, default: "" },
  phone: { type: String, required: true },
}, { timestamps: true });
```

### Favorite

```js
const favoriteSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
}, { timestamps: true });

favoriteSchema.index({ customer: 1, professional: 1 }, { unique: true });
```

### ServiceRequest

```js
const serviceRequestSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  description: { type: String, required: true },
  serviceAddress: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
    default: "pending",
    required: true,
  },
}, { timestamps: true });
```

### Review

```js
const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  serviceRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceRequest",
    required: true,
    unique: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: "" },
}, { timestamps: true });
```

## 6. Run it locally

### Back end

```bash
cd backend
npm install
# create backend/.env from backend/.env.example (see the table below)
npm start
```

The API runs on http://localhost:3000.

| Variable in `.env` | What it is |
|---|---|
| `MONGODB_URI` | The connection string of your MongoDB Atlas database |
| `JWT_SECRET` | Any long random text, used to sign login tokens |
| [Any other variable] | [What it is] |

### Front end

```bash
cd frontend
npm install
npm run dev
```

The app runs on [the address `npm run dev` prints, e.g. http://localhost:5173].
