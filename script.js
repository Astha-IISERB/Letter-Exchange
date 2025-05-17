const envelopeImg = document.getElementById('envelope-img');
const modalOverlay = document.getElementById('modal-overlay');

// Envelope click event
document.getElementById('envelope').addEventListener('click', () => {
  
  envelopeImg.src = 'open-envelope.png'; // Change envelope image to open one
  envelopeImg.style.animation = 'none'; // Stop wiggle animation

  // Show modal
  const envelopeRect = document.getElementById('envelope').getBoundingClientRect();
  const modal = document.querySelector('.modal');

  // Calculate the new position based on envelope position
  modal.style.top = `${envelopeRect.top - 20}px`;
  modal.style.left = `${envelopeRect.right + 20}px`;

  modalOverlay.style.display = 'block';

});

function closeModal() {
  modalOverlay.style.display = 'none';
  // Revert envelope image to closed and wiggle
  envelopeImg.src = 'envelope.png'; // Replace with your closed envelope image path
  envelopeImg.style.animation = 'wiggle 2s infinite';
}

// Clicking outside modal closes it
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

function submitKey() {
  const key = document.getElementById('secret-key').value;
  if (key == "XOOL") {
    closeModal();
    openVault();
  } else {
    alert("Begone intruder!!");
  }
}

function openVault() {
  const vaultAnimation = document.getElementById('vault-animation');
  const vaultModal = document.getElementById('vault-modal');

  // Show the animation
  vaultAnimation.style.display = 'block';

  // Wait for the animation to complete (e.g., 3 seconds)
  setTimeout(() => {
    vaultAnimation.style.display = 'none';
    vaultModal.style.display = 'block';
    vaultModal.classList.add('vault-open');
  }, 3000); // Adjust this time to match the duration of the GIF
}

function openLetter(content) {
  document.getElementById('letter-content').innerHTML = `<div class="letter-text">${content}</div>`;
  document.getElementById('letter-viewer').style.display = 'flex';
}

  function closeLetter() {
    document.getElementById('letter-viewer').style.display = 'none';
  }

const Letters = ['letter1.txt','letter2.txt'];

  // Example binding — you can assign unique content to each file icon
  document.querySelectorAll('.file-icon').forEach((icon, index) => {
    icon.addEventListener('click', async () => {
      try {
      const response = await fetch(Letters[index]);
      const text = await response.text();
      openLetter(text);
      } catch (err) {
        openLetter('Error loading letter.');
      }
    });
  });

document.querySelector('.attachment-icon').addEventListener('click', async () => {
  try {
    // Simulate loading image/video files — replace with your actual file paths
    const attachments = ['attach17(1).jpg', 'attach17(2).jpg'];
    document.getElementById('attachment-content').innerHTML = attachments.join('');
    document.getElementById('attachment-viewer').style.display = 'flex';
    } catch (err) {
    document.getElementById('attachment-content').innerHTML = 'Failed to load attachments.';
  }
});

function closeAttachment() {
  document.getElementById('attachment-viewer').style.display = 'none';
  document.getElementById('vault-modal').style.display = 'flex'; // Reopen vault
}
