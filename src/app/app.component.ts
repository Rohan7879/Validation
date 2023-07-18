import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'material2';
  isModuleOpen = false;
  removeButtonClicked: boolean = false;
  formSubmitted = false;
  editingRecordIndex: number = -1;
  formReset: boolean | undefined;

  openModal() {
    this.isModuleOpen = true;
    this.formReset = true;
  }
  username: string = '';
  email: string = '';
  city: string = '';
  gender: string = '';
  phoneNumber: string = '';
  selectedDate: string = '';
  selectedEndDate: string = '';
  duration: string = '';
  selectedImage: string = '';
  selectedHobbies: string[] = [];
  formsubmitted = false;

  checkboxChangeEvent(event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedHobbies.push(event.source.value);
    } else {
      const index = this.selectedHobbies.indexOf(event.source.value);
      if (index > -1) {
        this.selectedHobbies.slice(index, 1);
      }
    }
  }

  formData: any[] = [
    {
      username: 'abc',
      email: 'abc@example.com',
      phoneNumber: '(123) 345-7890',
      city: 'New York',
      gender: 'feMale',
      selectedDate: '6-20-2023',
      selectedEndDate: '6-30-2023',
      duration: '10 days',
      selectedHobbies: 'playing',
      selectedImage: './assets/panda.jpeg',
    },
    {
      username: 'xyz',
      email: 'xyz@example.com',
      phoneNumber: '(123) 345-7890',
      city: 'London',
      gender: 'male',
      selectedDate: '8-23-2023',
      selectedEndDate: '8-9-2023',
      duration: '14 days',
      selectedHobbies: 'Reading',
      selectedImage: './assets/vish.jpg',
    },
  ];

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email && !emailPattern.test(email)) {
      return false;
    }
    return true;
  }

  // formatDate(date: string): string {
  //   const formattedDate = new Date(date);
  //   return formattedDate.toISOString();
  // }

  validateUsername(username: string): boolean {
    const username1 = /^[a-zA-Z0-9]+$/;
    if (username && !username1.test(username)) {
      return false;
    }
    return true;
  }

  onPhoneNumberKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];
    const input = event.key;
    const isNumber = /^\d$/.test(input);

    if (!isNumber && !allowedKeys.includes(input)) {
      event.preventDefault();
    }
    const maxLength = 14;
    if (this.phoneNumber.length >= maxLength && !allowedKeys.includes(input)) {
      event.preventDefault();
    }
  }
  formatPhoneNumber() {
    const cleanedNumber = this.phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanedNumber.replace(
      /(\d{4})(\d{3})(\d{4})/,
      '($1) $2-$3'
    );
    this.phoneNumber = formattedNumber;
  }

  remove() {
    this.removeButtonClicked = true;
    this.selectedImage = '';
    const fileInput: any = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.convertToBase64(file);
  }
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
  }

  submitForm() {
    this.formsubmitted = true;

    if (this.selectedDate && this.selectedEndDate) {
      const startDate = new Date(this.selectedDate);
      const endDate = new Date(this.selectedEndDate);
      const timeDiff = endDate.getTime() - startDate.getTime();

      const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
      );
      const days = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      );

      if (timeDiff === 0) {
        this.duration = '';
      } else if (years > 0) {
        this.duration = `${years} years, ${months} months, ${days} days`;
      } else if (months > 0) {
        this.duration = `${months} months, ${days} days`;
      } else if (days > 0) {
        this.duration = `${days} days`;
      } else {
        this.duration = 'Less than a day';
      }
    }

    if (
      this.validateUsername(this.username) &&
      this.validateEmail(this.email) &&
      this.city &&
      this.gender &&
      this.selectedDate &&
      this.selectedEndDate &&
      this.selectedHobbies.length > 0
    ) {
      console.log('User Name:', this.username);
      console.log('City:', this.city);
      console.log('Gender:', this.gender);
      console.log('Email:', this.email);
      console.log('Phone Number:', this.phoneNumber);
      console.log('SelectedDate:', this.selectedDate);
      console.log('SelectedEndDate:', this.selectedEndDate);
      console.log('selectedHobbies', this.selectedHobbies);

      const formDataObj = {
        username: this.username,
        email: this.email,
        phoneNumber: this.phoneNumber,
        city: this.city,
        gender: this.gender,
        selectedHobbies: this.selectedHobbies,
        selectedDate: this.selectedDate,
        selectedEndDate: this.selectedEndDate,
        duration: this.duration,
        selectedImage: this.selectedImage,
      };

      this.formData.push(formDataObj);

      this.username = '';
      this.email = '';
      this.phoneNumber = '';
      this.city = '';
      this.gender = '';
      this.selectedHobbies = [];
      this.selectedEndDate = '';
      this.selectedDate = '';
      this.duration = '';
      this.selectedImage = '';
      this.isModuleOpen = false;
      this.clearForm();
    }
  }
  validateNumber(phoneNumber: string) {
    throw new Error('Method not implemented.');
  }
  deleteRecord(index: number) {
    this.formData.splice(index, 1);
  }

  editRecord(index: number) {
    this.editingRecordIndex = index;
    const record = this.formData[index];
    this.username = record.username;
    this.email = record.email;
    this.phoneNumber = record.phoneNumber;
    this.city = record.city;
    this.selectedHobbies = record.selectedHobbies.slice();
    this.gender = record.gender;
    this.selectedDate = record.selectedDate;
    this.selectedEndDate = record.selectedEndDate;
    this.selectedImage = record.selectedImage;
    this.duration = record.duraton;
    this.removeButtonClicked = false;
    this.isModuleOpen = true;

    const startDate = new Date(this.selectedDate);
    const endDate = new Date(this.selectedEndDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    const days = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    if (timeDiff === 0) {
      this.duration = '';
    } else if (years > 0) {
      this.duration = `${years} years, ${months} months, ${days} days`;
    } else if (months > 0) {
      this.duration = `${months} months, ${days} days`;
    } else if (days > 0) {
      this.duration = `${days} days`;
    } else {
      this.duration = 'Less than a day';
    }
  }
  updateRecord() {
    const editedRecord = {
      username: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      city: this.city,
      selectedHobbies: this.selectedHobbies,
      gender: this.gender,
      selectedDate: this.selectedDate,
      selectedEndDate: this.selectedEndDate,
      duration: this.duration,
      selectedImage: this.selectedImage,
    };

    this.formData[this.editingRecordIndex] = editedRecord;
    this.clearForm();
    this.editingRecordIndex = -1;
  }
  clearForm() {
    this.username = '';
    this.email = '';
    this.phoneNumber = '';
    this.city = '';
    this.selectedHobbies = [];
    this.gender = '';
    this.selectedDate = '';
    this.selectedEndDate = '';
    this.selectedImage = '';
    this.duration = '';
    this.removeButtonClicked = false;
    this.formsubmitted = true;
    this.isModuleOpen = false;
    this.formReset = true;
  }
}
