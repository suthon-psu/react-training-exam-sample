# แบบทดสอบ: Task Management Dashboard

**เวลาที่กำหนด:** 50 นาที  
**คะแนนเต็ม:** 100 คะแนน

## ภาพรวมของโจทย์

สร้างแอพพลิเคชัน Task Management Dashboard โดยใช้ React, MUI, React Router, Zustand และ React Hook Form

เราได้เตรียมไฟล์ layout และ CSS ให้แล้วในโฟลเดอร์ `/src/components/`:
- `App.tsx` - Layout หลักพร้อม Navigation
- `Dashboard.tsx` - หน้า Dashboard 
- `Tasks.tsx` - หน้า Tasks

**ห้ามแก้ไข UI/Layout ที่มีอยู่แล้ว** เพียงแค่เพิ่ม functionality ตามที่กำหนด

---

## ส่วนที่ 1: การติดตั้งและการตั้งค่าเริ่มต้น (10 คะแนน)

### 1.1 ติดตั้ง Dependencies (5 คะแนน)
ติดตั้ง packages ที่จำเป็น:
```bash
npm install zustand react-hook-form
```

### 1.2 ตั้งค่า Project Structure (5 คะแนน)
สร้างโฟลเดอร์และไฟล์ตามโครงสร้างนี้:
```
app/
├── components/
│   ├── App.tsx (ให้แล้ว)
│   ├── Dashboard.tsx (ให้แล้ว)
│   └── Tasks.tsx (ให้แล้ว)
├── store/
│   └── taskStore.ts
├── types/
│   └── Task.ts
└── root.tsx
```

---

## ส่วนที่ 2: ประเภทข้อมูลและ Interface (15 คะแนน)

### 2.1 สร้าง Task Interface (15 คะแนน)

สร้างไฟล์ `src/types/Task.ts`:

```typescript
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
}
```

---

## ส่วนที่ 3: Zustand Store (25 คะแนน)

### 3.1 สร้าง Task Store (25 คะแนน)

สร้างไฟล์ `src/store/taskStore.ts` พร้อม state และ actions:

**State:**
- `tasks: Task[]` - array ของ tasks

**Actions:**
- `addTask(task: Omit<Task, 'id' | 'createdAt'>)` - เพิ่ม task ใหม่
- `toggleTask(id: string)` - เปลี่ยนสถานะ completed
- `deleteTask(id: string)` - ลบ task

**ข้อกำหนด:**
- ใช้ `Date.now().toString()` หรือ `Math.random().toString(36)` สำหรับสร้าง id
- ตั้งค่า `createdAt` เป็น `new Date()`
- จัดเรียง tasks โดย createdAt (ล่าสุดก่อน)

---

## ส่วนที่ 4: React Router (15 คะแนน)

### 4.1 ตั้งค่า Router (10 คะแนน)

แก้ไขไฟล์ `src/main.tsx`:
- Wrap `<App />` ด้วย `<BrowserRouter>`

แก้ไขไฟล์ `src/components/App.tsx`:
- Import และใช้ `Routes`, `Route` จาก react-router-dom
- สร้าง routes:
  - `/` → `<Dashboard />`
  - `/tasks` → `<Tasks />`

### 4.2 Navigation (5 คะแนน)

ในไฟล์ `App.tsx`:
- Import `useNavigate` 
- ใช้ `navigate(item.path)` ใน `onClick` ของ menu items

---

## ส่วนที่ 5: Dashboard Component (10 คะแนน)

### 5.1 เชื่อมต่อกับ Store (10 คะแนน)

แก้ไขไฟล์ `src/components/Dashboard.tsx`:

1. **Import และใช้ store:**
   ```typescript
   import { useTaskStore } from '../store/taskStore';
   const { tasks } = useTaskStore();
   ```

2. **คำนวณสถิติ:**
   - `totalTasks` - จำนวน tasks ทั้งหมด
   - `completedTasks` - จำนวน tasks ที่เสร็จแล้ว
   - `pendingTasks` - จำนวน tasks ที่ยังไม่เสร็จ
   - `completionRate` - เปอร์เซ็นต์ความสำเร็จ (ปัดเศษ)

3. **แสดง recent tasks:**
   - แสดง 5 tasks ล่าสุด
   - เรียงตาม `createdAt` (ล่าสุดก่อน)

---

## ส่วนที่ 6: Tasks Component (25 คะแนน)

### 6.1 เชื่อมต่อกับ Store (10 คะแนน)

แก้ไขไฟล์ `src/components/Tasks.tsx`:

1. **Import และใช้ store:**
   ```typescript
   const { tasks, toggleTask, deleteTask } = useTaskStore();
   ```

2. **Implement filtering logic:**
   - `all` - แสดงทุก tasks
   - `completed` - แสดงเฉพาะ tasks ที่เสร็จแล้ว  
   - `pending` - แสดงเฉพาะ tasks ที่ยังไม่เสร็จ
   - `high` - แสดงเฉพาะ tasks ที่มี priority = 'high'

3. **เชื่อมต่อ actions:**
   - `toggleTask(task.id)` ใน checkbox onChange
   - `deleteTask(task.id)` ใน delete button onClick

### 6.2 React Hook Form (15 คะแนน)

เพิ่ม React Hook Form ใน dialog:

1. **Setup form:**
   ```typescript
   import { useForm } from 'react-hook-form';
   
   interface FormData {
     title: string;
     description: string;
     priority: 'low' | 'medium' | 'high';
   }
   
   const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
   ```

2. **Form validation:**
   - `title` - required (ข้อความ: "กรุณากรอกชื่อ task")
   - `priority` - required (ข้อความ: "กรุณาเลือก priority")

3. **Form submission:**
   ```typescript
   const onSubmit = (data: FormData) => {
     addTask(data);
     reset();
     setOpenDialog(false);
   };
   ```

4. **เชื่อมต่อกับ TextField และ Select:**
   - ใช้ `{...register()}` 
   - แสดง error messages
   - เชื่อมต่อ `onSubmit={handleSubmit(onSubmit)}`

---

## เกณฑ์การให้คะแนน

| ส่วน | คะแนน | รายละเอียด |
|------|-------|------------|
| **Setup** | 10 | การติดตั้งและโครงสร้างไฟล์ |
| **Types** | 15 | Task interface ถูกต้อง |
| **Zustand** | 25 | Store และ actions ทำงานได้ |
| **Router** | 15 | Navigation ระหว่างหน้าได้ |
| **Dashboard** | 10 | แสดงสถิติและ recent tasks |
| **Tasks** | 25 | แสดง tasks, filter, CRUD operations |
| **รวม** | **100** |  |

