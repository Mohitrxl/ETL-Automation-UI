// ETL Code Generator UI JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI
    initializeUI();
    
    // Add event listeners
    addEventListeners();
});

function initializeUI() {
    console.log('ETL Code Generator UI initialized');
    
    // Set default selections if needed
    const sourceDropdown = document.querySelector('.source-section .dropdown');
    const destinationDropdown = document.querySelector('.destination-section .dropdown');
    
    if (sourceDropdown) {
        sourceDropdown.value = '';
    }
    
    if (destinationDropdown) {
        destinationDropdown.value = '';
    }
}

function addEventListeners() {
    // Data source dropdown change
    const sourceDropdown = document.querySelector('.source-section .dropdown');
    if (sourceDropdown) {
        sourceDropdown.addEventListener('change', function(e) {
            handleSourceChange(e.target.value);
        });
    }
    
    // Data destination dropdown change
    const destinationDropdown = document.querySelector('.destination-section .dropdown');
    if (destinationDropdown) {
        destinationDropdown.addEventListener('change', function(e) {
            handleDestinationChange(e.target.value);
        });
    }
    
    // Icon click events for data sources
    const sourceIcons = document.querySelectorAll('.source-section .icon-item');
    sourceIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconType = this.querySelector('span').textContent.toLowerCase();
            selectSourceIcon(iconType);
        });
    });
    
    // Icon click events for data destinations
    const destinationIcons = document.querySelectorAll('.destination-section .icon-item');
    destinationIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconType = this.querySelector('span').textContent.toLowerCase();
            selectDestinationIcon(iconType);
        });
    });
    
    // Prompt input handling
    const promptField = document.querySelector('.prompt-field');
    if (promptField) {
        promptField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handlePromptSubmit(e.target.value);
            }
        });
    }
    
    // Microphone icon click
    const micIcon = document.querySelector('.mic-icon');
    if (micIcon) {
        micIcon.addEventListener('click', function() {
            handleVoiceInput();
        });
    }
    
    // Search icon click
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            const promptField = document.querySelector('.prompt-field');
            if (promptField && promptField.value.trim()) {
                handlePromptSubmit(promptField.value);
            }
        });
    }
    
    // Enter button click
    const enterButton = document.querySelector('.enter-button');
    if (enterButton) {
        enterButton.addEventListener('click', function() {
            const promptField = document.querySelector('.prompt-field');
            if (promptField && promptField.value.trim()) {
                handlePromptSubmit(promptField.value);
            }
        });
    }
}

function handleSourceChange(value) {
    console.log('Data source selected:', value);
    
    // Update UI based on selection
    const sourceSection = document.querySelector('.source-section');
    if (sourceSection) {
        // Remove previous active states
        sourceSection.querySelectorAll('.icon-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active state to corresponding icon
        if (value) {
            const iconMap = {
                'database': 'Database',
                'file': 'File',
                'api': 'API'
            };
            
            const targetIcon = Array.from(sourceSection.querySelectorAll('.icon-item')).find(item => 
                item.querySelector('span').textContent === iconMap[value]
            );
            
            if (targetIcon) {
                targetIcon.classList.add('active');
            }
        }
    }
    
    // Enable/disable destination based on source selection
    updateDestinationState(value);
}

function handleDestinationChange(value) {
    console.log('Data destination selected:', value);
    
    // Update UI based on selection
    const destinationSection = document.querySelector('.destination-section');
    if (destinationSection) {
        // Remove previous active states
        destinationSection.querySelectorAll('.icon-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active state to corresponding icon
        if (value) {
            const iconMap = {
                'aws': 'AWS',
                'azure': 'Azure',
                'gcp': 'Google Cloud'
            };
            
            const targetIcon = Array.from(destinationSection.querySelectorAll('.icon-item')).find(item => 
                item.querySelector('span').textContent === iconMap[value]
            );
            
            if (targetIcon) {
                targetIcon.classList.add('active');
            }
        }
    }
}

function selectSourceIcon(iconType) {
    console.log('Source icon selected:', iconType);
    
    // Update dropdown value
    const sourceDropdown = document.querySelector('.source-section .dropdown');
    if (sourceDropdown) {
        const valueMap = {
            'database': 'database',
            'file': 'file',
            'api': 'api'
        };
        
        if (valueMap[iconType]) {
            sourceDropdown.value = valueMap[iconType];
            handleSourceChange(valueMap[iconType]);
        }
    }
}

function selectDestinationIcon(iconType) {
    console.log('Destination icon selected:', iconType);
    
    // Update dropdown value
    const destinationDropdown = document.querySelector('.destination-section .dropdown');
    if (destinationDropdown) {
        const valueMap = {
            'aws': 'aws',
            'azure': 'azure',
            'google cloud': 'gcp'
        };
        
        if (valueMap[iconType]) {
            destinationDropdown.value = valueMap[iconType];
            handleDestinationChange(valueMap[iconType]);
        }
    }
}

function updateDestinationState(sourceValue) {
    const destinationDropdown = document.querySelector('.destination-section .dropdown');
    const destinationSection = document.querySelector('.destination-section');
    
    if (destinationDropdown && destinationSection) {
        if (sourceValue) {
            destinationDropdown.disabled = false;
            destinationSection.style.opacity = '1';
            destinationSection.style.pointerEvents = 'auto';
        } else {
            destinationDropdown.disabled = true;
            destinationSection.style.opacity = '0.6';
            destinationSection.style.pointerEvents = 'none';
        }
    }
}

function handlePromptSubmit(promptText) {
    if (!promptText.trim()) {
        showNotification('Please enter a prompt for ETL code generation', 'warning');
        return;
    }
    
    const sourceValue = document.querySelector('.source-section .dropdown').value;
    const destinationValue = document.querySelector('.destination-section .dropdown').value;
    
    if (!sourceValue) {
        showNotification('Please select a data source first', 'warning');
        return;
    }
    
    if (!destinationValue) {
        showNotification('Please select a data destination first', 'warning');
        return;
    }
    
    console.log('Generating ETL code with:', {
        source: sourceValue,
        destination: destinationValue,
        prompt: promptText
    });
    
    // Show success notification
    showNotification('ETL code generation request submitted successfully!', 'success');
    
    // Here you would typically make an API call to generate the ETL code
    // For now, we'll just log the request
    generateETLCode(sourceValue, destinationValue, promptText);
}

// Global function for HTML onclick attribute
function handleEnterClick() {
    const promptField = document.querySelector('.prompt-field');
    if (promptField && promptField.value.trim()) {
        handlePromptSubmit(promptField.value);
    } else {
        showNotification('Please enter a prompt for ETL code generation', 'warning');
    }
}

function handleVoiceInput() {
    console.log('Voice input requested');
    
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        showNotification('Voice input feature coming soon!', 'info');
    } else {
        showNotification('Voice input not supported in this browser', 'warning');
    }
}

function generateETLCode(source, destination, prompt) {
    // This is where you would integrate with your ETL code generation service
    // For demonstration purposes, we'll show a mock response
    
    setTimeout(() => {
        const mockResponse = `Generated ETL code for ${source} to ${destination}:\n\n# ETL Pipeline Code\n# Source: ${source}\n# Destination: ${destination}\n# Prompt: ${prompt}\n\n# Your ETL code would be generated here...`;
        
        console.log(mockResponse);
        showNotification('ETL code generated! Check console for details.', 'success');
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .icon-item.active {
        transform: scale(1.1);
        color: #8b5cf6;
    }
    
    .icon-item.active i {
        color: #8b5cf6;
    }
`;
document.head.appendChild(style);
