const ProfessionalRegistration = {
    template: `
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="container p-4 bg-light rounded shadow-lg d-flex">
            <div class="container vh-100 d-flex align-items-center">
                <div class="row w-100">
                    <div class="col-md-6 d-flex justify-content-center">
                        <img src="/static/images/professional.jpg" class="img-fluid rounded" alt="Professional">
                    </div>
                
                    <div class="col-md-6 p-4">
                        <h2 class="text-center text-primary">Professional Signup</h2>
                        <form @submit.prevent="professionalregister">
                            
                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                                <input type="email" id="email" v-model="email" class="form-control" placeholder="Email ID" required>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                                <input type="password" id="password" v-model="password" class="form-control" placeholder="Password" required>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                                <input type="text" id="username" v-model="username" class="form-control" placeholder="Username" required>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-id-card"></i></span>
                                <input type="text" id="fullname" v-model="fullname" class="form-control" placeholder="Full Name" required>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-briefcase"></i></span>
                                <input type="number" id="experience" v-model="experience" class="form-control" placeholder="Years of Experience" required>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-tools"></i></span>
                                <select id="servicename" v-model="servicename" class="form-control" required>
                                    <option value="" disabled>Select Available Services</option>
                                    <option v-for="service in services" :key="service.id" :value="service.id">
                                        {{ service.service_name || 'Service Name Not Available' }} 
                                    </option>
                                </select>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-file-upload"></i></span>
                                <input type="file" id="file" @change="handleFileUpload" class="form-control" required>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-map-marker-alt"></i></span>
                                <input type="text" id="address" v-model="address" class="form-control" placeholder="Address" required>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-map-pin"></i></span>
                                <input type="number" id="pincode" v-model="pincode" class="form-control" placeholder="Pincode" required>
                            </div>

                            <div class="mb-3 input-group">
                                <span class="input-group-text"><i class="fa-solid fa-phone"></i></span>
                                <input type="tel" id="phoneno" v-model="phoneno" class="form-control" placeholder="Phone Number" required>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            email: '',
            password: '',
            username: '',
            fullname: '',
            experience: '',
            servicename: '',
            file: '',
            address: '',
            pincode: '',
            phoneno: '',
            selectedFile: null, 
            services: [], 
        };
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },
        async professionalregister() {
            try {
                const formData = new FormData();
                formData.append('email', this.email);
                formData.append('password', this.password);
                formData.append('username', this.username);
                formData.append('fullname', this.fullname);
                formData.append('experience', this.experience);
                formData.append('servicename', this.servicename);
                formData.append('address', this.address);
                formData.append('pincode', this.pincode);
                formData.append('phoneno', this.phoneno);
                
                if (this.selectedFile) {
                    formData.append('file', this.selectedFile);
                }

                const response = await fetch(`${location.origin}/api/professionalregister`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Registration successful');
                    this.$router.push('/');
                } else {
                    alert(data?.message || 'Registration failed');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred');
            }
        },
        async fetchServices() {
            try {
                const response = await fetch(`${location.origin}/api/services`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    this.services = Array.isArray(data) ? data : [data];
                } else {
                    console.error('Failed to fetch services');
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
    },
    mounted() {
        this.fetchServices(); 
    },
};

export default ProfessionalRegistration;
